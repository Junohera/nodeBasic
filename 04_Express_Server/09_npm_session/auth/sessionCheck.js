module.exports.sessionCheck = (req, res, next) => {
    console.log("sessionCheck");
    const sessionUser = req.session.loginUser;
    if (sessionUser) {
        next();
    } else {
        res.render('login', {msg: 'required login'});
    }
};