const express = require('express');
const User = require('../models/user');
const Comment = require('../models/comment');
const { noExtendLeft } = require('sequelize/types/lib/operators');

const router = express.Router();

router.get('/', (req, res)=>{
    try {
        res.render('sequelize', {});
    } catch (e) {
        console.error(e);
        next(e);
    }    
});

module.exports = router;