// 파일 읽기 쓰기를 위한 모듈
const fs = require('fs');

fs.readFile('./02_builtin/readme.txt', (err, data) => {
    // err : 파일읽기 실패시
    // data : 파일읽기에 성공시    

    if (err) {
        throw err;
    }

    console.log(data); // 16진수 출력
    console.log(data.toString()); // 문자열 출력
});