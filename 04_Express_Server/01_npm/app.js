const express = require('express');
const path = require('path');

const app = express();


app.set('port', process.env.PORT || 3000);
app.get('/', (req, res) => {
    // res.send('Hello, Express');
    res.sendFile(
        path.join(__dirname, 'index.html') // __dirname의 내용과 index.html 파일명이 조합된 종합경로가 만들어지고 그 내용을 클라이언트에 전달
    );
});
app.listen(app.get('port'), () => {
    console.log(app.get('port'), 'is running ... ');
});

/**
 * app.js
 * ! 서버 구동에 핵심이 되는 파일
 * 
 * 중요 메서드 : [
 *     app.set('port', ${port})                                     :로 서버가 실행될 포트 지정
 *     app.get('methodType', ${anonymous function})     :methodType으로 요청이 들어올 때 어떤 동작을 할지 지정
 *     app.listen(${port}, ${anonymous function})           : 몇번 포트에서 서버를 실행할지 지정
 * ]
 */