const jwt = require('jsonwebtoken');
const YOUR_SECRET_KEY = process.env.SECRET_KEY || "test";
const verifyToken = (req, res, next) => {
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
exports.verifyToken = verifyToken;