const Member = require('../models/member');
const jwt = require('jsonwebtoken');
const YOUR_SECRET_KEY = process.env.SECRET_KEY || "test";
exports.createToken = async function(req, res, next) {
    try {
        console.log('req.body =>', JSON.stringify(req.body, undefined, 2));
        const member = await Member.findOne({
            where: {
                userid: req.body.userid,
                pwd: req.body.pwd,
            }
        });
        console.log('member =>', JSON.stringify(member, undefined, 2));
        if (member) {
            const token = jwt.sign({
                userid: member.userid
            }, YOUR_SECRET_KEY, {
                expiresIn: '1h'
            });
            res.cookie('member', token);
            res.status(201).json({
                result: 'ok',
                token
            });
        } else {
            res.status(400).json({
                error: 'invalid user'
            });
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};