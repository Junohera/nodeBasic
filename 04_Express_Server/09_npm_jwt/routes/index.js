const express = require('express');
const Member = require('../models/member');
const Board = require('../models/board');
const { createToken } = require('../auth/createToken');
const { hasVerifyToken } = require('../auth/verifyToken');

const router = express.Router();

router.get('/', async (req, res) =>{
    if (hasVerifyToken(req)) { // 토큰 유효시 로그인 생략
        res.redirect('/board');
    } else {
        res.render('index');
    }
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.post('/signup', async (req, res, next) => {
    try {
        const member = await Member.create({
            userid: req.body.userid,
            pwd: req.body.pwd,
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
        });
        console.log(member);
        res.status(201).json(member);
    } catch (e) {
        console.error('e =>', e);
        next(e);
    }
});

router.post('/signin', createToken);

module.exports = router;