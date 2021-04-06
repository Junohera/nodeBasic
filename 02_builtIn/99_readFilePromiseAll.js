const fs = require('fs').promises;

console.time('시간측정');
Promise.all([
    './02_builtin/readme1.txt',
    './02_builtin/readme2.txt',
    './02_builtin/readme3.txt',
].map(v => fs.readFile(v)))
    .then(values => {
        console.timeEnd('시간측정');
        values.forEach(v => console.log(v.toString()));
    })
    .catch(error => {
        console.error(error);
    });