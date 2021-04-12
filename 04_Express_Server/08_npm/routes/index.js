const express = require('express');
const User = require('../models/user');
const Comment = require('../models/comment');
// const { noExtendLeft } = require('sequelize/types/lib/operators');

const router = express.Router();

router.get('/', async (req, res) =>{
    try {
        const users = await User.findAll();
        
        res.render('sequelize', {
            users,
        });
    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;