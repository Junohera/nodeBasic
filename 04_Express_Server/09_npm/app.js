const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');

const { sequelize } = require('./models');

const app = express();
app.set('port', process.env.PORT || 3005);
app.set('view engine', 'html');
nunjucks.configure('views', {   express: app,   watch: true,   });

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use('/', require('./routes'));
app.use('/member', require('./routes/member'));
app.use('/board', require('./routes/board'));

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
    res.render('error');
});
app.listen(app.get('port'), () => {
    console.log(app.get('port'), 'IS RUNNING ###');
});