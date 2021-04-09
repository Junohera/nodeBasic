/**
 * Template engine
 * * HTML의 단점을 개선하기위해 사용되는 마크업 & 실행언어
 * * 반복문, 조건문, 변수 등을 사용할 수 있습니다.
 * * HTML 태그와 같이 어울려 작성하고, 동적페이지 작성이 가능합니다.
 * * HTML 안에서 사용되는 JSP문법과 비슷
 * * Pug(구 Jage), el, nunjucks 등이 있습니다.
 */

const express = require('express');
const nunjucks = require('nunjucks');
const app = express();

app.set('port', process.env.PORT || 3000);

// app.set('변수이름', 저장내용); 
// node server에서 사용할 수 있는 저장소 중 하나이며 가장 직관적으로 다룰 수 있는 공간입니다.
// 변수값을 얻어내기위해 app.get('key');
// 다만 시스템에서 사용하는 이름이 많고 노출의 위험이 있어서
// 시스템 정보 이외의 내용을 추가하는 행위는 지양.
app.set('view engine', 'html');
// nunjucks 적용 폴더 및 설정
nunjucks.configure('views', {
    express: app,
    watch: true,
});
app.get('/', (req, res) => {
    res.send('test');
});
app.use((err, req, res, next) => {
    console.error('err =>', err);
    res.send(err.message);
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), 'is running ... ');
});