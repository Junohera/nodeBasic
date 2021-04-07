const http = require('http');
const fs = require('fs').promises;

const users = {};

http.createServer(async (req, res) => {
    try {
        console.log(req.method, '=>', JSON.stringify(req.url, undefined, 2));
        if (req.method === 'GET') {
            if (req.url === '/') {
                const data = await fs.readFile('./03_HTTP_Server/05_restFront.html');
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                return res.end(data);
            }
            else if (req.url === '/about') {
                const data = await fs.readFile('./03_HTTP_Server/05_about.html');
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                return res.end(data);
            } else if (req.url === '/users') {
                res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                return res.end(JSON.stringify(users));
            }

            // js, css, 등등 파일 요청에 대한 처리구간
            try {
                const data = await fs.readFile(`.${req.url}`);
                return res.end(data);
            } catch (e) {
               // 주소에 해당하는 route를 못 찾았다는 404 Not Found Error 발생
            }
        }
        else if (req.method === 'POST') {
            if (req.url === '/user') {
                let body = '';
                // 요청의 body를 stream형식으로 받음
                req.on('data', data => {
                    body += data;
                });

                // 요청의 body를 다 받은 후 실행됨
                return req.on('end', () => {
                    console.log('POST 본문(Body): ', body);
                    const { name } = JSON.parse(body); // 전달된 데이터를 name변수에
                    const id = Date.now(); // id 변수에 날짜를 
                    users[id] = name; // id가 키값, name이 value로 객체에 저장
                    res.writeHead(201, { 'Content-Type': 'text/plain; charset=utf-8'});
                    res.end('ok');
                });
            }
        }
        else if (req.method === 'PUT') {
            if (req.url.startsWith('/user/')) { // axios.put('/user/' + key, { name });
                const key = req.url.split('/')[2];
                let body = '';
                req.on('data', data => {
                    body += data;
                });
                return req.on('end', () => {
                    console.log('PUT 본문(Body): ', body);
                    users[key] = JSON.parse(body).name;
                    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
                    return res.end('ok');
                });
            }
        }
        else if (req.method === 'DELETE') {
            if (req.url.startsWith('/user/')) { // axios.delete('/user/' + key);
                const key = req.url.split('/')[2];
                delete users[key];
                res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
                return res.end('ok');
            }
        }
        else {console.log('req.method =>', JSON.stringify(req.method, undefined, 2));}

        res.writeHead(404);
        return res.end('NOT FOUND');
    } catch (err) {
        console.error('err =>', err);
        res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
        return res.end(err.message);
    }
}).listen(8082, () => {
    console.log('ready 8082 ');
});