const fs = require('fs');

console.log('시작');

fs.readFile('./02_builtin/readme1.txt', (err, data) => {
    if (err) {throw err;}
    console.log('1번', data.toString());

    fs.readFile('./02_builtin/readme2.txt', (err, data) => {
        if (err) {throw err;}
        console.log('2번', data.toString());

        fs.readFile('./02_builtin/readme3.txt', (err, data) => {
            if (err) {throw err;}
            console.log('3번', data.toString());

            console.log('끝');
        });
    });
});