const fs = require('fs').promises;

fs.readFile('./02_builtin/readme.txt')
    .then(data => {
        console.log(data);
        console.log(data.toString());
    })
    .catch(err => {
        console.error('err =>', err); 
    });