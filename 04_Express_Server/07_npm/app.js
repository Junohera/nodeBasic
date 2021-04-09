const express = require('express');
const nunjucks = require('nunjucks');
const app = express();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');
// nunjucks 적용 폴더 및 설정
nunjucks.configure('views', {
    express: app,
    watch: true,
});
app.get('/', (req, res) => {
    res.send('test');
});
app.use((err, req, res, next) => {
    console.error('err =>', err);
    res.send(err.message);
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), 'is running ... ');
});