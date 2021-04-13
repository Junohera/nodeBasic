const express = require('express');
const Member = require('../models/member');
const Board = require('../models/board');
const router = express.Router();

const { sessionCheck } = require('../auth/sessionCheck');

router.get('/main', sessionCheck, async (req, res, next) => {
    const luser = req.session.loginUser;
    const boards = await Board.findAll();
    try {
        res.render('main', { luser, boards });
    } catch(err) {
        console.error('err =>', err);
        next(err);
    }
});

router.get('/', async (req, res, next) =>{
    try {
        res.render('login');     
    } catch (e) {
        console.error('e =>', e);
        next(e);
    }
});

module.exports = router;