const http = require('http');
const fs = require('fs').promises;

http.createServer(async(req, res) => {
    try {
        const data = await fs.readFile('./03_HTTP_SERVER/04_Server04.html');
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.end(data);
    } catch (err) {
        res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end(err.message);
    }
})
    .listen(8081, () => {
        console.log('8081번 포트에서 서버 대기중입니다!');
        .
    });

    /**
     * http status code
     * 2XX : 서버 전송 정상 완료
     * 3XX : 리다이렉션(다른 페이지로 이동)을 알리는 상태
     * 4XX : 요청 오류
     * 5XX : 서버 오류
     */