const express = require('express');
const Member = require('../models/member');
const Board = require('../models/board');
const { createToken } = require('../auth/createToken');

const router = express.Router();

router.get('/', async (req, res) =>{
    try {
        res.render('index', {
            members: await Member.findAll(),
        });
    } catch (e) {
        console.error(e);
        next(e);
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