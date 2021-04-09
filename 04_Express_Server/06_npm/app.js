const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();

app.set('port', process.env.PORT || 3000);
// ! <Router>
    const indexRouter = require('./routes');
    const userRouter = require('./routes/users');
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