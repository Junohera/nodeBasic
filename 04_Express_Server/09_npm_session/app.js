const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');

const { sequelize } = require('./models');

const indexRouter = require('./routes');
const memberRouter = require('./routes/member');
const boardRouter = require('./routes/board');

const app = express();
app.set('port', process.env.PORT || 3005);
app.set('view engine', 'html');
nunjucks.configure('views', {   express: app,   watch: true,   });

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use('/', indexRouter);
app.use('/member', memberRouter);
app.use('/board', boardRouter);

sequelize.sync({ force:false })
.then(() => { console.log('::: DATABASE CONNECTION SUCCESS :::'); })
.catch((err) => { console.error(err); });

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    console.log('err =>', JSON.stringify(err, undefined, 2));
    res.render('error', {err});
});
app.listen(app.get('port'), () => {
    console.log(app.get('port'), 'IS RUNNING ###');
});