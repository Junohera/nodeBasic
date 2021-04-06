const fs = require('fs').promises;

console.log('시작');
console.time('시간측정');

/**
 * readme1.txt readme2.txt readme3.txt를 차례로 읽어 출력하고 마지막에 '끝'출력
 */

const targetFiles = [
    './02_builtin/readme1.txt',
    './02_builtin/readme2.txt',
    './02_builtin/readme3.txt',
];

fs.readFile(targetFiles[0])
    .then(data => {
        console.log(data.toString());
        return fs.readFile(targetFiles[1]);
    })
    .then(data => {
        console.log(data.toString());
        return fs.readFile(targetFiles[2]);
    })
    .then(data => {
        console.timeEnd('시간측정');
        console.log(data.toString());
    })
    .catch(err => {
        console.error('err =>', err);
    });