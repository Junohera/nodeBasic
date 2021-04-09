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

/**
 * ! 에러발생 -----------------------------------------------------------
 * * 파일 하단에 5. 에러처리 2 가 없으면 브라우저에 에러내역이 표시되어 모든 서버구조가 노출됩니다.(500Error)
 * * 에러내역은 서버의 콘솔에만나오고 브라우저에는 에러처리 내용만 나오도록 에러처리 라우터를 마지막에 추가합니다.
 */
app.use((req, res, next) => {
    // ! 에러발생 2
    // throw new Error('에러를 발생시킨다!!');

    // ! 에러발생 1
    try {
        // console.log(정의안된 변수사용);
    } catch (error) {
        next(error); // 에러처리 미들웨어로 이동하라는 next
        // next에 error가 인수로 들어가면 에러처리 라우터로 이동합니다.
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/about', (req, res) => {
    res.send('Hello, About');
    /**
     * ! Middleware의 특성
     * * 하나의 미들웨어에서 res.send() 또는 res.sendFile()등을 두번이상 사용 불가
     * * res.json()도 마찬가지
     * * res.send가 내부적으로 httpserver시 res.writeHeader() + res.end()가 포함되어 제공되는 것이므로 두번이상 사용시 에러발생
     */

    // res.json()
    // res.writeHeader(200, {'Content-Type': 'application/json'});
    // res.end(FJSON.stringify({hello: 'hong'}));
    // 위 둘이 합쳐져서 res.json({hello:'hone'});으로 사용됩니다.
    // 역시 다른 메서드들과 함께 두번 이상 사용하지않습니다.
});
app.get('/users', (req, res) => {
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

/**
 * ! error
 * 
 */

/**
 * ! 에러처리 2 -----------------------------------------------------------
 * * 에러처리 라우터에 있는 미들웨어는 반드시 매개변수가
 * * err, req, res, next 네개가 쓰여져야 에러처리로 인식됩니다.
 * * 넷 중에 하나만 빠져도 에러처리 라우터로 인식되지않습니다.
 */
app.use((err, req, res, next) => {
    console.error(err);
    res.status(200).send('에러내용을 브라우저에 알려주지않을거야');
    // res.send('에러내용을 브라우저에 알려주지않을거야');
});
/**
 * ! 404 에러처리 -----------------------------------------------------------
 */
app.use((err, req, res, next) => {
    // res.send('404 임 ㅋ');
    // res.status(404).send('404 임 ㅋ');
});


app.listen(app.get('port'), () => {
    console.log(app.get('port'), 'is running ... ');
});
