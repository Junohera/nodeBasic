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
        // isLogin ? onlyMember : index.html
        const isLogin = req.cookies.name || false;

        if (isLogin) {
            res.redirect('/onlyMember');
        } else {
            res.clearCookie('name');
            res.sendFile(path.join(__dirname, 'index.html'));
        }
    });

    app.post('/login', (req, res) => {
        console.log('req.body =>', JSON.stringify(req.body, undefined, 2));
        const name = req.body.name;
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 1);
        res.cookie('name', encodeURIComponent(name), {
            expires: expires,
            httpOnly: true,
            path: '/'
        });

        res.redirect('/');
    });

    app.get('/onlyMember', (req, res) => {
        let name = req.cookies.name || null;

        if (name) {
            name = decodeURIComponent(name);
            res.send(`<h1>onlyMember welcome :  ${name}</h1>`);
        } else {
            throw new Error('로그인 되지않은 유저... main!!!');
        }
    });
// ! </playground>

// ! <Advice>
app.use((err, req, res, next) => {
    console.error(err);
    res.redirect('/');
});
// ! </Advice>

// ! <config>
app.listen(app.get('port'), () => {
    console.log(app.get('port'), 'is running ... ');
});
// ! </config>