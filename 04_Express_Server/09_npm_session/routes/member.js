const express = require('express');
const Member = require('../models/member');
const Board = require('../models/board');
const router = express.Router();

router.get('/', (req, res, next) =>{
    try {
        res.render('member_insert');
    } catch (e) {
        console.error('e =>', e);
        next(e);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const member = await Member.findOne({
            where: {
                userid: req.body.userid
            },
        });
        if (member) {
            req.session.loginUser = member;
            res.json(member);
        } else {
            res.json('');
        }
    } catch (e) {
        console.error('e =>', e);
        next(e);
    }
})

router.post('/addmember', async (req, res, next) => {
    try {
        console.log('req.body =>', JSON.stringify(req.body, undefined, 2));
        const member = await Member.create({
            userid: req.body.userid,
            pwd: req.body.pwd,
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
        });
        console.log(member);
        res.json(member);
    } catch (e) {
        console.log(e);
        res.status(400).json(e.message);
    }
});

module.exports = router;