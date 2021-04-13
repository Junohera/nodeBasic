const express = require('express');
const Member = require('../models/member');
const Board = require('../models/board');
const router = express.Router();

router.get('/', async (req, res) =>{

});

router.get('/board_insert', (req, res) => {
    const luser = req.session.loginUser;
    if (luser) {
        res.render('board_insert', { luser });
    } else {
        res.redirect('/');
    }
});
router.post('/addboard', async (req, res, next) => {
    try {
        const board = await Board.create({
            writer: req.body.writer,
            subject: req.body.subject,
            text: req.body.text,
        });
        console.log(board);
        res.json(board);
    } catch (e) {
        console.error('e =>', e);
        next(e);
    }
});

module.exports = router;