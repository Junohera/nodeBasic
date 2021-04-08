const express = require('express');
const path = require('path');

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// ! <config>
    const app = express();
    app.set('port', process.env.PORT || 3000);
// ! </config>

// ! <common-middleware-config>
    app.use(morgan('dev'));
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    app.use(session({
        resave: false,
        saveUninitialized: false,
        secret: 'junojunojuno',
    }));
// ! </common-middleware-config>

// ! <playground>
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'index.html'));
    });
// ! </playground>

// ! <config>
app.listen(app.get('port'), () => {
    console.log(app.get('port'), 'is running ... ');
});
// ! </config>