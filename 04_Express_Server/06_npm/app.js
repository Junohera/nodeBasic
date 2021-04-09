const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();

app.set('port', process.env.PORT || 3000);

// ! <Hidden>
// 경로 숨기기
    // localhost:3000/routes/ -> localhost:3000으로
    // app.use('/', express.static(path.join(__dirname, 'routes')));
// ! </Hidden>

// ! <Router>
    const indexRouter = require('./routes');
    const userRouter = require('./routes/users');

    // 현재 사용할 '/'와 indexRouter에 있는 '/'와 조합 -> '/'
    app.use('/', indexRouter);

    // 현재 사용할 '/users'와 userRouter에 있는 '/'와 조합 -> '/users/'
    app.use('/users', userRouter);
// ! </Router>

app.get('*', (req, res) => {
    throw new Error('no page');
});
app.use((err, req, res, next) => {
    console.error(err);
    res.status(404).send(err.message);
});
app.listen(app.get('port'), () => {
    console.log(app.get('port'), 'is running ... ');
});