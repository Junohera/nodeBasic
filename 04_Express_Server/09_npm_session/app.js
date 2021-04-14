// ! require modules
const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
const { sequelize } = require('./models');
const session = require('express-session');
const dateFilter = require('nunjucks-date-filter');

// ! require routers
const indexRouter = require('./routes');
const memberRouter = require('./routes/member');
const boardRouter = require('./routes/board');

// ! require middleware
const { sessionCheck } = require('./auth/sessionCheck');

// ! app & nunjucks
const app = express();
app.set('port', process.env.PORT || 3005);
app.set('view engine', 'html');

// ! nunjucks
nunjucks
    .configure('views', {   express: app,   watch: true,   })
    .addFilter('date', dateFilter);


// ! config
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'junojunojuno',
    cookie: {
        httpOnly: true,
        secure: false,
    },
    name: 'session-cookie',
}));

// ! database
sequelize.sync({ force: false })
.then(() => { console.log('::: DATABASE CONNECTION SUCCESS :::'); })
.catch((err) => { console.error(err); });

// ! config router
app.use('/', indexRouter);
app.use('/member', memberRouter);
app.use('/board', sessionCheck, boardRouter);

// ! common error middleware
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error', {err});
});

// ! ready
app.listen(app.get('port'), () => {
    console.log(app.get('port'), 'IS RUNNING ###');
});