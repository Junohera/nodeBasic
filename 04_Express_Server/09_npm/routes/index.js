const express = require('express');
const Member = require('../models/member');
const Board = require('../models/board');
// const { noExtendLeft } = require('sequelize/types/lib/operators');

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

router.post('/signin', async (req, res, next) => {
    console.log('req.body =>', JSON.stringify(req.body, undefined, 2));
    try{
        
        const member = await Member.findOne({
            where: {
                userid: req.body.userid,
            }
        });
        console.log('member =>', JSON.stringify(member, undefined, 2));
        let message = null;
        let status = null;
        if (member) {
            if (member.pwd === req.body.pwd) {
                res.status(status = 200).json({});
            } else {
                message = "diff pass";
                status = 401;
                res.json({ status, message });
            }
        } else {
            message = "no member"
            status = 403;
            res.json({ status, message });
        }
        
    } catch(e) {
        console.error('e =>', e);
        next(e);
    }
})

module.exports = router;