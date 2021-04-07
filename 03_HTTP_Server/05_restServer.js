const http = require('http');
const fs = require('fs').promises;

http.createServer(async (req, res) => {
    try {
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
            }

            // js, css, 등등 파일 요청에 대한 처리구간
            try {
               const data = await fs.readFile(`.${req.url}`);
                return res.end(data);
            } catch (e) {
               // 주소에 해당하는 route를 못 찾았다는 404 Not Found Error 발생
            }
        }
        else if (req.method === 'POST') {}
        else if (req.method === 'PUT') {}
        else if (req.method === 'DELETE') {}
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