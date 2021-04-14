const express = require('express');
const Member = require('../models/member');
const Board = require('../models/board');
const router = express.Router();

router.get('/', async (req, res, next) =>{
    try {
        if (req.query.edit) {
            const member = await Member.findOne({
                where: {
                    userid: req.session.loginUser.userid,
                },
            });
            res.render('member_update', {member});
        } else {
            res.render('member_insert');
        }
    } catch (e) {
        console.error('e =>', e);
        next(e);
    }
});

router.post('/update', async (req, res, next) => {
    try {
        const member = {
            userid: req.body.userid,
            pwd: req.body.pwd,
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
        };
        await Member.update({
            userid: member.userid,
            pwd: member.pwd,
            name: member.name,
            phone: member.phone,
            email: member.email,
        }, {
            where: {
                userid: req.session.loginUser.userid,
            }
        });
        req.session.loginUser = member;
        res.redirect('/main');
    } catch (e) {
        
    }
})

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
        const member = await Member.create({
            userid: req.body.userid,
            pwd: req.body.pwd,
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
        });
        res.json(member);
    } catch (e) {
        console.log(e);
        res.status(400).json(e.message);
    }
});

module.exports = router;