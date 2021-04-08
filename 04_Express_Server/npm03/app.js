const express = require('express');
const path = require('path');

const morgan = require('morgan'); // 각각의 요청과 응답에 대한 필요정보를 보기위한 모듈
const cookieParser = require('cookie-parser'); // 쿠키 사용을 간결히 사용하기위함
const session = require('express-session'); // 세션 사용을 간결히 사용하기위함

// ! <config>
    const app = express();
    app.set('port', process.env.PORT || 3000);
// ! </config>

// ! <common-middleware-config>
    /** 
     * ! morgan
     * * 실행결과 GET / 200 5.316 ms - 165
     * * method 방식, 응답 결과코드, 요청과 실행에 걸린 시간 등등
     * ? app.use(morgan('combined')); 으로 설정시 더 자세한 내용을 볼 수도 있음.
     */
    app.use(morgan('dev'));

    app.use(cookieParser());
    
// ! </common-middleware-config>

// ! <playground>
    app.get('/', (req, res) => {
        // res.sendFile(path.join(__dirname, 'index.html'));
        res.send('<h1>Hello Express Server~!!</h1>');
    });
// ! </playground>

// ! <config>
app.listen(app.get('port'), () => {
    console.log(app.get('port'), 'is running ... ');
});
// ! </config>