const express = require('express');
const User = require('../Models/user');
const UserModel = require('../Models/user');
const router = express.Router();
const jwt = require('./jwt');
const jwv = require('./jwt2');

const authMiddleware = async (req, res, next) => {
    const [, token] = req.headers.authorization.split(' ');
    try {
        const payload = await jwv(token);
        const user = await UserModel.findById(payload.user);

        if(!user){
            return res.send(401);
        }

        req.auth = user;

        next();
    } catch (error) {
        res.send(401, error);
    }
}

router.post('/signup', async (req, res) => {
    const user = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })

    try {
        
        const token = jwt({ user: user.id });

        const a1 = await user.save();
        
        res.json({a1, token});
    } catch (error) {
        res.send({ message: "Email já utilizado!"});
    }
});

router.get('/signin', async (req, res) => {
    const [, hash] = req.headers.authorization.split(' ');
    const [email, password] = Buffer.from(hash, 'base64').toString().split(':');

    try {
        const user = await UserModel.findOne({ email, password });
        console.log(email, password);
        if(!user){
            return res.send(401);
        }
        const token = jwt({ user: user.id });

        res.send({user, token});
    } catch (error) {
        res.send({message: "Email/senha incorretas!"});
    }
});

router.get('/users', authMiddleware, async (req, res) =>{
    try {
        const users = await UserModel.find();

        res.send(users);
    } catch (error) {
        res.send(error);
    }
})

router.get('/me', authMiddleware, async (req, res) => {
    res.send(req.auth);
})

module.exports = router;