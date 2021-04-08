const express = require('express');
const path = require('path');

const morgan = require('morgan'); // 각각의 요청과 응답에 대한 필요정보를 보기위한 모듈
const cookieParser = require('cookie-parser'); // 쿠키 사용을 간결히 사용하기위함
const session = require('express-session'); // 세션 사용을 간결히 사용하기위함

const app = express();

app.set('port', process.env.PORT || 3000);

app.use((req, res, next) => {
    console.log(`${req.method} ::: ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), 'is running ... ');
});