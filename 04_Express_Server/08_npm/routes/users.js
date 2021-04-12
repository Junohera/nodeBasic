const express = require('express');
const User = require('../models/user');
const Comment = require('../models/comment');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        // User 객체를 통해 users 테이블의 모든 데이터 조회
        const users = await User.findAll();
        // 결과를 json 형식으로 리턴
        res.json(users);
    } catch (e) {
        console.error(e);
        next(e); // 에러 루틴이 있는 라우터로 이동
    }
});

router.post('/', async (req, res, next) => {
    try {
        // 레코드 추가 함수 : create
        const user = await User.create({
            name: req.body.name,
            age: req.body.age,
            married: req.body.married,
        });
        console.log(user);
        res.status(201).json(user);
    } catch (e) {
        console.error(e);
        next(e); // 에러 루틴이 있는 라우터로 이동
    }
});

module.exports = router;