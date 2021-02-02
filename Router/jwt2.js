const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const secret = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9';

sign = paylaod => jwt.sign(paylaod, secret,{ expiresIn: 86400 });
verify = token => jwt.verify(token, secret);

module.exports = verify;
    