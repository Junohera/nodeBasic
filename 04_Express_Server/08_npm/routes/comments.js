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

module.exports = router;