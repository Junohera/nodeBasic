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
    next();
    // 모든 라우터에 next가 있지만, 사용하지않아서 생략된 상태이므로 필요시 꺼내서 사용 가능.
});

app.get('/', (req, res) => {
    // console.log("모든 요청에 실행하고싶어");
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

// ! Wildcard character & Request keyword
app.get('/category/Boots', (req, res) => {
    res.send('<h2>Hello Boots</h2>');
});
app.get('/category/Heel', (req, res) => {
    res.send('<h2>Hello Heel</h2>');
});

/**
 * ! :${variableName}
 * * wildcard를 사용한 라우터는 범위가 넓으므로 가능한 아래쪽에 위치시켜
 * * 명확히 구분된 라우터들을 먼저실행하게한다.
 * * 해당 라우터가 없을 때 실행되게 하는것이 효과적
 * 
 * ? pathVariable과 비슷
*/
app.get('/category/:name', (req, res) => {
    res.send(`<h2>Hello Wild Card Char ${req.params.name}</h2>`);
});

/**
 * ! use
 * * 특정 리퀘스트에서만 실행될 미들웨어
 * * get과 post 등 모든 method에서 실행됨.
 * * 단, next()로 인해 제어권이 아래로 이동하여, 해당 get이나 post등이 추가 실행될 수 있음.
 */
app.use('/about', (req, res, next) => {
    console.log('about 요청에서만 실행하고싶어');
    next();
});

/**
 * ! chainning Middleware
 * * middleware를 여러개 넣어 연달아 사용 가능
 */
app.use(
    (req, res, next) => {
        console.log('middleware 1');
        next();
    }, 
    (req, res, next) => {
        console.log('middleware 2');
        next();
    },
    (req, res, next) => {
        console.log('middleware 3');
        next();
    }
);

/**
 * ! * 
 * * 모든 요청을 처리할수 있으므로 예상하지못한 경로들까지 처리가능
 * * => 404 에러방지를 위한 라우터
 */
app.get('*', (req, res) => {
    res.send('Hello everybody');
});





app.listen(app.get('port'), () => {
    console.log(app.get('port'), 'is running ... ');
});