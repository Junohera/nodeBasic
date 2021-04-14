const express = require('express');
const Member = require('../models/member');
const Board = require('../models/board');
const router = express.Router();

router.get('/', async (req, res, next) =>{
    try {
        res.json(await Board.findAll());
    } catch (e) {
        console.error('e =>', e);
        next(e);
    }
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

router.get('/:id', async (req, res, next) => {
    try {
        const board = await Board.findOne({
            where: {
                id: req.params.id,
            },
        });
        const allowModify = req.session.loginUser.userid === board.writer;
        if (req.query.edit) {
            if (!allowModify) {
                throw new Error('diff loginUser, writer');
            }
            res.render('board_update', { board, allowModify });
        }
        else if (req.query.edited) {
            res.render('board_detail', { board, allowModify });
        }
        else {
            console.log('board =>', JSON.stringify(board, undefined, 2));
            Board.update({
                readCount: ++board.readCount,
            },
            {
                where: {
                    id: req.params.id,
                }
            }).then(() => {
                res.render('board_detail', { board, allowModify });
            });
        }
    } catch (e) {
        console.error('e =>', e);
        next(e);
    }
});

router.post('/update', async (req, res, next) => {
    try {
        const allowModify = req.session.loginUser.userid === req.body.writer;

        console.log('req.body =>', JSON.stringify(req.body, undefined, 2));

        if (allowModify) {
            await Board.update({
                subject: req.body.subject,
                text: req.body.text,
            }, {
                where: {
                    id: req.body.id,
                }
            });
            res.redirect(`/board/${req.body.id}?edited=1`);
        } else {
            throw new Error('403');
        }
    } catch (e) {
        console.error('e =>', e);
        next(e);
    }
})

module.exports = router;