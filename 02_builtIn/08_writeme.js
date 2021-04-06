const fs = require('fs');

const testFile = './02_builtin/writeme.txt';
fs.writeFile(testFile, '글이 입력됩니다', (err) => {
    if (err) {
        throw err;
    }
    fs.readFile(testFile, (err, data) => {
        if (err) {
            throw err;
        }
        console.log(data.toString());
    });
});