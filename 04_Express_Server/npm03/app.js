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
    app.use(morgan('combined'));

    app.use(cookieParser());

    app.use(express.json()); // bodyParser json : formData 사용을 위한 모듈
    app.use(express.urlencoded({extended:true}));  // bodyParser formData modules
    app.use(session({
        resave: false,
        saveUninitialized: false,
        secret: 'junojunojuno',
    })); // 세션 활용을 위한 미들웨어
    
// ! </common-middleware-config>

// ! <playground>

    app.get('/', (req, res) => {
        // 1. 저장된 쿠키를 불러와 활용할 변수 res.cookies 확인
        console.log(req.cookies);

        // 2. 새로운 쿠키의 저장
        const name = '홍길동';
        res.cookie('name', encodeURIComponent(name),{
            expires: new Date(),
            httpOnly: true,
            path: '/'
        });

        // 3. 쿠키의 삭제
        /*
        res.clearCookie('name', encodeURIComponent(name), {
            httpOnly: true,
            path: '/',
        });
        */


        res.sendFile(path.join(__dirname, 'index.html'));
        // res.send('<h1>Hello Express Server~!!</h1>');
    });
// ! </playground>

// ! <config>
app.listen(app.get('port'), () => {
    console.log(app.get('port'), 'is running ... ');
});
// ! </config>