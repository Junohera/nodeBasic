const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

const parseCookies = cookie =>
    cookie
        .split(';')  // ';'로 분리
        .map(v => v.split('='))  // ';'로 분리한 데이터마다 '='로 분리
        .reduce((acc, [k, v]) => { // '='로 분리된 값은 k와 v로 전달되어 객체형태로 리턴
            acc[k.trim()] = decodeURIComponent(v); // for Korean
            return acc;
        }, {});
        

http.createServer(async (req, res) => {
    console.log('======= REQUEST ======');
        console.log('req.method =>', JSON.stringify(req.method, undefined, 2));
        console.log('req.url =>', JSON.stringify(req.url, undefined, 2));
    const cookies = req.headers.cookie ? parseCookies(req.headers.cookie) : {name:null};
        console.log('cookies =>', cookies);
    console.log('====================');

    // 주소가 login으로 시작
    if (req.url.startsWith('/login')) { // 처음 로그인시
        // 쿼리스트링 분리
        const { query } = url.parse(req.url);
        console.log('query =>', JSON.stringify(query, undefined, 2));
        
        // 쿼리스트링에서 실제 데이터만 분리
        const { name } = qs.parse(query);
        console.log('name =>', JSON.stringify(name, undefined, 2));

        // 쿠키 유효시간 설정
        const expires = new Date();
        
        // 쿠키의 유효시간을 현재시간 +1분으로 설정
        expires.setMinutes(expires.getMinutes() + 1);
        res.writeHead(302, {
            Location: '/',
            'Set-Cookie': [
                `name=${encodeURIComponent(name)}`,
                `Expires=${expires.toGMTString()}`,
                `HttpOnly`,
                `Path=/`,
            ].join(';'),
        });
        res.end();
    }
    // 로그인상태 (login request가 아니면서 name 쿠키가 있는경우)
    else if (cookies.name) {
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end(`${cookies.name}님 안녕하세요`);
    }
    // 미로그인 상태 (login request가 아니면서 name 쿠키가 없는 경우)
    else {
        try {
            const data = await fs.readFile('./03_HTTP_Server/06_Cookie_page.html');
            res.writeHead(200, {'Set-Cookie': 'mycookie=test'});
            res.end(data);
        } catch (error) {
            res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
            res.end(error.message);
        }
    }
}).listen(8081, () => {
    console.log('======== ready 8081 =========');
});

