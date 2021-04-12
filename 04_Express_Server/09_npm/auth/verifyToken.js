const jwt = require('jsonwebtoken');
const YOUR_SECRET_KEY = process.env.SECRET_KEY || "test";

/**
 * 미들웨어 체이닝용, 토큰체크
 * * 공통 에러 처리
 * @returns CallBack 
 */
module.exports.verifyToken = (req, res, next) => {
    console.log("verifyToken");
    try {
        const clientToken = req.cookies.member;
        const decoded = jwt.verify(clientToken, YOUR_SECRET_KEY);
        if (decoded) {
            res.locals.userId = decoded.user_id;
            next();
        } else {
            throw new Error(401);
            // res.status(401).json({
            //     error: 'unauthorized'
            // });
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};
/**
 * 요청시 쿠키값으로 토큰유효여부 반환
 * * 호출한 지점에서 직접처리하기위함
 * @returns Boolean 
 */
module.exports.hasVerifyToken = req => {
    console.log("hasVerifyToken");
    try {
        if (jwt.verify(req.cookies.member, YOUR_SECRET_KEY)) {
            return true;
        } else {
            return false;
        }

        return decoded;
    } catch(e) {
        return false;
    }
};