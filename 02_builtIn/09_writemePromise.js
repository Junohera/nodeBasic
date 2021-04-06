const fs = require('fs').promises;

const testFile = './02_builtin/writeme.txt';
fs.writeFile(testFile, '글이 입력됩니다')
    .then(() => fs.readFile(testFile))
    .then(data => console.log(data.toString()))
    .catch(err => {
        console.error(err);
    });