const express = require('express');
const Member = require('../models/member');
const Board = require('../models/board');
const Reply = require('../models/reply');
const router = express.Router();

router.get('/', async (req, res, next) =>{
    try {
        res.json(await Board.findAll({
            include: Reply,
            order: [
                ['id', 'DESC',]
            ],
        }));
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
        res.json(board);
    } catch (e) {
        console.error('e =>', e);
        next(e);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const board = await Board.findOne({
            include: Reply,
            where: {
                id: req.params.id,
            },
        });
        const luser = req.session.loginUser;
        const allowModify = req.session.loginUser.userid === board.writer;
        if (req.query.edit) {
            if (!allowModify) {
                throw new Error('diff loginUser, writer');
            }
            res.render('board_update', { board, allowModify });
        }
        else if (req.query.edited) {
            res.render('board_detail', { board, allowModify, luser});
        }
        else {
            Board.update({
                readCount: ++board.readCount,
            },
            {
                where: {
                    id: req.params.id,
                }
            }).then(() => {
                res.render('board_detail', { board, allowModify, luser });
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
});

router.get('/:id/reply', async (req, res, next) => {
    try {
        res.json(await Reply.findAll({
            where: {
                board: req.params.id
            }
        }));
    } catch (e) {
        console.error('e =>', e);
        next(e);
    }
});

router.delete('/:id/:reId', async (req, res, next) => {
    try {
        await Reply.destroy({
            where: {
                board: req.params.id,
                id: req.params.reId,
            }
        });
        res.status(204).json({});
    } catch (e) {
        console.error('e =>', e);
        next(e);
    }
});

router.post('/:id/reply', async (req, res, next) => {
    try {
        const reply = {
            rewriter: req.session.loginUser.userid,
            board: req.params.id,
            text: req.body.text,
        };
        await Reply.create(reply);

        res.status(201).json(await Reply.findAll({
            where: {
                board: req.params.id
            }
        }));
    } catch (e) {
        console.error('e =>', e);
        next(e);
    }
});

module.exports = router;