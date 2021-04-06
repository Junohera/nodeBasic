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

console.log('-----------------------------------------------------------');
console.log('path.dirname(): ', path.dirname(string));        // 파일의 폴더경로
console.log('path.extname(): ', path.extname(string));       // 파일의 확장자
console.log('path.basename(): ', path.basename(string));   // 파일의 이름
console.log('path.basename - extname:', path.basename(string, path.extname(string)));  // 파일의 이름만(함수의 두번째 인자로 확장자를 넣어줍니다.)
console.log('path.parse(): ', path.parse(string));               // 파일의 경로를 root, dir, base, ext, name으로 분리
// 파일의 경로와 이름, 확장자를 제공하고, 경로-파일이름-확장자로 조합합니다.
console.log('path.format():', path.format({
    dir: 'D:\\juno\\workspaces\\nodeBasic',
    name: 'javascript_ex',
    ext: '.js'
}));

// 파일 경로를 사용하던중 \나 /를 실수로 여러번 기입한 걸 수정.
console.log('pasth.normalize():',
    path.normalize('D:\\\\juno///workspaces\\\\nodeBasic')
);

console.log('-----------------------------------------------------------');
// 파일의 경로가 절대경로인지 상대경로인지 true false 반환
console.log('path.isAbsolute("C:\\"): ', path.isAbsolute("C:\\"));
console.log('path.isAbsolute("./home"): ', path.isAbsolute("./home"));