const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
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

    // CORE: default foldering
    (() => {
        // upload 폴더 확인, 만약 현재 위치에 해당 폴더가 없다면
        // 에러발생 및 에러처리로 폴더를 새로 생성
        try {
            fs.readdirSync('uploads');
        } catch (error) {
            console.error('uploads 폴더가 없어 uploads폴더를 생성합니다.');
            fs.mkdirSync('uploads');
        }
    })();
    

    // multer 객체를 생성하고 필요한 옵션을 설정합니다.
    const upload = multer({
        // 저장매체 및 파일옵션 설정
        storage : multer.diskStorage({
            destination(req, file, done) {
                done(null, 'uploads/'); // 폴더 설정
                // 첫번째 인수 null은 현재파일(file)의 경로와 이름 그대로 사용(변경 및 추가 없음)
            },
            filename(req, file, done) {
                const ext = path.extname(file.originalname); // 확장자 추출
                // 파일이름 + 오늘 날짜(milliseconds) + 확장자
                done(null, path.basename(file.originalname, ext) + Date.now() + ext);
                // abc.jpg -> abc12345678.jpg
                // 업로드 파일명이 같은 경우, 처리할 객체가 없고, 위와 같은 방법으로 파일명의 충돌을 방지
            },
        }),

        limits: {fileSize: 5 * 1024 * 1024}, // 업로드 파일 사이즈 제한
    });
// ! </init>

// ! <playground>
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'multipart.html'));
    });

    // 'image'업로드에서 전송된 폼데이터 중 파일선택 태그의 이름
    // ! <input type="file" name="image"/>
    app.post(
        '/upload',
        upload.single('image'),
        (req, res) => {
            console.log(req.file);
            res.send('ok');
        },
    );

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