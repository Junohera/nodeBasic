const express = require('express');
const User = require('../models/user');
const Comment = require('../models/comment');

const router = express.Router();

router.get('/', (req, res)=>{
    
});

router.post('/', async (req, res, next)=>{
    try {
        const comment = await Comment.create({
            commenter: req.body.userid,
            comment: req.body.comment,
        });
        console.log(comment);
        res.json(comment);
    } catch (e) {
        console.error('e =>', e);
        next(e);
    }    
});

router.patch('/:id', async (req, res, next) => {
    try {
        const result = await Comment.update(
            {
                comment: req.body.comment,
            },
            {
                where: {
                    id: req.params.id, // 전달된 id(댓글번호)를 
                }
            },
        );
        res.json(result);
    } catch (e) {
        console.error('e =>', e);
        next(e);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const result = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json(result);
    } catch (error) {
        console.error('error =>', error);
        next(e);
    }
});

module.exports = router;