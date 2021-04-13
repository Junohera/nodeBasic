module.exports.sessionCheck = (req, res, next) => {
    console.log("sessionCheck");
    const sessionUser = req.session.loginUser;
    console.log('sessionUser =>', JSON.stringify(sessionUser, undefined, 2));
    if (sessionUser) {
        next();
    } else {
        res.redirect('/');
    }
};