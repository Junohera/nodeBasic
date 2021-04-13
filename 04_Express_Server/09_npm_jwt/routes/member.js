const express = require('express');
const Member = require('../models/member');
const Board = require('../models/board');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const members = await Member.findAll();
        console.log('members =>', JSON.stringify(members, undefined, 2));
        res.render('member', { members });
    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;