const express = require('express');
const path = require('path');
const morgan = require('morgan');
// ! <config>
    const app = express();
    app.set('port', process.env.PORT || 3000);
// ! </config>
// ! <common-middleware-config>
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
// ! </common-middleware-config>
// ! <playground>
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'index.html'));
    });
    app.get('*', (req, res) => {
        throw new Error('no page');
    });
// ! </playground>
// ! <Advice>
app.use((err, req, res, next) => {
    console.error(err);
    res.status(404).send(err.message);
});
// ! </Advice>
// ! <config>
app.listen(app.get('port'), () => {
    console.log(app.get('port'), 'is running ... ');
});
// ! </config>