const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

const parseCookies = cookie =>
    cookie
        .split(';')
        .map(v => v.split('='))
        .reduce((acc, [key, value]) => {
            acc[key.trim()] = decodeURIComponent(value);
            return acc;
        }, {});

const session = {};

http.createServer(async (req, res) => {
    const cookies = req.headers.cookie ? parseCookies(req.headers.cookie) : {};
    console.log('cookies =>', JSON.stringify(cookies, undefined, 2));

    // #1. 로그인 경로진입
    if (req.url.startsWith('/login')) {
        const { query } = url.parse(req.url);
        const { name } = qs.parse(query);

        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 5);
        
        const uniqueInt = Date.now(); // 세션 객체에 저장하기 위한 고유 키값

        session[uniqueInt] = { // 세션객체에 고유 키값과 만료시간 저장
            name,
            expires,
        };

        res.writeHead(302, {
            Location: '/',
            'Set-Cookie': [
                `session=${uniqueInt}`,
                `Expires=${expires.toGMTString()}`,
                `HttpOnly`,
                `Path=/`,
            ].join(';')
        }); // 세션에는 고유키값만 session이라는 키와 함께 저장
        res.end();
    }

    // #2. 세션쿠키가 존재하고 만료기간이 지나지않았다면
    else if (
        cookies.session &&
        session[cookies.session].expires > new Date()
    ) {
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end(`${session[cookies.session].name}님 안녕하세요`);
    }

    // #3. 
    else {
        try {
            const data = await fs.readFile('./03_HTTP_Server/06_Cookie_page.html');
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(data);
        } catch (error) {
            res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
            res.end(error.message);
        }
    }
}).listen(8081, () => {
    console.log('ready 8081 ');
})