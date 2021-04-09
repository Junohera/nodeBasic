const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
// ! <config>
    const app = express();
    app.set('port', process.env.PORT || 3000);
// ! </config>
// ! <common-middleware-config>
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
// ! </common-middleware-config>

// ! <init>
    // upload 폴더 확인, 만약 현재 위치에 해당 폴더가 없다면
    // 에러발생 및 에러처리로 폴더를 새로 생성
    try {
        fs.readdirSync('uploads');
    } catch (error) {
        console.error('uploads 폴더가 없어 uploads폴더를 생성합니다.');
        fs.mkdirSync('uploads');
    }

    // multer 객체를 생성하고 필요한 옵션을 설정합니다.
    const upload = multer({
        // 저장매체 및 파일옵션 설정
        storage : multer.diskStorage({
            destination(req, file, done) {
                done(null, 'uploads/'); // 폴더 설정
            },
            filename(req, file, done) {
                const ext = path.extname(file.originalname); // 확장자 추출
                // 파일이름 + 오늘 날짜(milliseconds) + 확장자
                done(null, path.basename(file.originalname, ext) + Date.now() + ext);
            },
        }),
    });

// ! </init>

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
    res.redirect('/');
});
// ! </Advice>
// ! <config>
app.listen(app.get('port'), () => {
    console.log(app.get('port'), 'is running ... ');
});
// ! </config>