const http = require('http');

http.createServer(async (req, res) => {
    console.log(req.url, req.headers.cookie);
    res.writeHead(200, {'Set-Cookie' : 'mycookie=test'});
    res.end('Hello Cookie');
}).listen(8081, () => {
    console.log('======== ready 8081 =========');
});

/**
 * ! Cookie
 * * 단점 : 누가(어떤 client)가 보낸 요청인지를 알 수 없음.
 * * ip주소와 브라우저정보는 알 수 있음.
 * * 이를 위해 쿠키를 이용할 수 있다.
 * * 쿠키 - key: value의 쌍으로 이루어진 데이터
 * * 매 요청(request)마다 서버에 쿠키가 자동으로 동봉되어 보내짐.
 * * 서버는 쿠키를 읽어 누구인지 파악
 * 
 * * 쿠키를 직접 넣어서 구현하려면 writeHead 메서드를 이용해 요청헤더에 입력합니다.
 * * 내용은 Set-Cookie로 브라우저에 쿠키를 설정하라고 명령
 * 
 * * http요청과 응답은 header와 body를 갖습니다.
 * * header : 요청 또는 응답의 정보내용
 * * body : 주고받은 실제 데이터
 * * Cookie는 부가적인 데이터이므로 헤더에 저장합니다.
 */
