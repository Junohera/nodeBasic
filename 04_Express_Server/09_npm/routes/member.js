const express = require('express');
const Member = require('../models/member');
const Board = require('../models/board');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        res.json(await Board.findAll());
    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;