/**
 * 한번에 여러개의 서버를 실행합니다
 * 방법은 createServer를 여러번 호출하는 방식으로 진행합니다
 * ! 단, 서로 다른 서버의 포트를 다르게 지정
 * ! 포트번호가 충돌하면 eaddrinuse 에러가 발생
 * 
 * * req, res : request, response의 의미를 갖는 변수.
 * * 매개변수이고, 서버에 있는 실제 request, response 객체가 전달됨.
 * * 매개변수는 그 객체를 전달받아 사용하는 것으로 변수의 이름은 자유롭게 변경이 가능
 * * 다만, 함수내에서 변경된 이름을 일관되게 사용하는 것이 중요
 */


const http = require('http');

// ! #1
http.createServer((req, res) => {
    // 응답 내용의 본문 전송
    res.write('<h1>Hello Node Server #1!</h1>');
    // 응답 내용의 마지막 전송 : res.end 실행후에는 더이상 응답내용이 전송될 수 없습니다.
    res.end('<p>Hello Server #1!</p>');
}).listen(8081, () => { // 포트번호와 함께 이벤트 리스터 설정
    console.log('8081번 포트에서 서버 대기 중입니다!');
});

// ! #2
 http.createServer((req, res) => {
    // 응답 내용의 본문 전송
    res.write('<h1>Hello Node Server #2!</h1>');
    // 응답 내용의 마지막 전송 : res.end 실행후에는 더이상 응답내용이 전송될 수 없습니다.
    res.end('<p>Hello Server #2!</p>');
}).listen(8082, () => { // 포트번호와 함께 이벤트 리스터 설정
    console.log('8082번 포트에서 서버 대기 중입니다!');
});