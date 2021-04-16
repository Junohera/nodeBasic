const multer = require('multer');
const path = require('path');
const fs = require('fs');

const PATH = 'public/uploads/';

module.exports = {
    PATH,
    init: () => {
        try {
            fs.readdirSync(PATH);
        } catch (error) {
            console.error('### CREATE uploads DIRECTORY ###');
            fs.mkdirSync(PATH);
        }
    },
    upload: multer({
        storage: multer.diskStorage({
            destination(req, file, done) {
                done(null, PATH);
            },
            filename(req, file, done) {
                const ext = path.extname(file.originalname);
                done(null, path.basename(file.originalname, ext) + Date.now() + ext);
            }
        })
    }),
    remove: removePath => {
        console.log('removePath =>', JSON.stringify(removePath, undefined, 2));
        fs.unlink(PATH + removePath, err => {
            console.error('err =>', err);
        });
    },
};