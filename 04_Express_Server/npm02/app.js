const express = require('express');
const path = require('path');

const app = express();

/**
 * ! Router
 * * app.get() 또는 app.post() 등 ... request로 키워드를 받아
 * * 해당 요청에 응답을 보내주는 메서드들
 * * 첫번째 요소 리퀘스트 키워드를 요청받아 익명함수를 실행해 응답
 * 
 * ! MiddleWare
 * * Router안에 들어가는 익명함수들 () => {}
 * 
 */
app.set('port', process.env.PORT || 3000);

// ! Router 실행전에 실행될 MiddleWare
app.use((req, res, next) => {
    console.log("모든 요청에 실행하고싶어", req.url);
    next();
});

app.get('/', (req, res) => {
    // console.log("모든 요청에 실행하고싶어");
    console.log(req.method);
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/about', (req, res) => {
    // console.log("모든 요청에 실행하고싶어");
    res.send('Hello, About');
});
app.get('/users', (req, res) => {
    // console.log("모든 요청에 실행하고싶어");
    res.send('<h2>Hello, Express Users</h2>');
});
app.listen(app.get('port'), () => {
    console.log(app.get('port'), 'is running ... ');
});