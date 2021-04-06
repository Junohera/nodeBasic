const path = require('path');

// path가 아니어도 사용 가능한 경로와 파일관련 상수
console.log(__filename); // 현재 사용중인 파일이름
console.log(__dirname); // 현재 파일이 위치한 경로
console.log('test');


// 현재 경로와 파일의 이름을 변수에 저장
const string = __filename;

console.log('path.sep:', path.sep); // 경로내부의 폴더들 구분문자
// '\' -> c:\users\java01와 같이 사용
console.log('path.delimiter:', path.delimiter); // 환경변수내에서 서로다른 경로를 같이 나타낼 때 구분해주는 구분문자
// c:\users\java01; c:\users\java01\documents; 와 같이 사용