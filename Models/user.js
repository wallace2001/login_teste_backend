const mongoose = require('mongoose');
const crypto = require('crypto');

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
        select: false,
        set: value => crypto.createHash('md5').update(value).digest('hex'),
    },
    createAt:{
        type: Date,
        default: Date.now,
    }
})


const User = mongoose.model('User', schema);

module.exports = User;