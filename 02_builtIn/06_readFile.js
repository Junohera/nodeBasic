// 파일 읽기 쓰기를 위한 모듈
const fs = require('fs');

fs.readFile('./02_builtin/readme.txt', (err, data) => {
    // err : 파일읽기 실패시
    // data : 파일읽기에 성공시    

    if (err) {
        throw err;
    }

    console.log(data);
    console.log(data.toString());
});