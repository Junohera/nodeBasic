const express = require('express');
const Member = require('../models/member');
const Board = require('../models/board');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('boardList', {});
});

router.post('/', (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
});

module.exports = router;