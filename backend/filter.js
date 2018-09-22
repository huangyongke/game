exports.checkLogin = function (req, res, next) {
    if (req.session.user)
        next();
    else {
        res.send('login')
        
    }
}
exports.checkAuth = function (req, res, next) {
    if (req.session.user){
        if (req.session.user.admin)
        next();
        else {
            res.send('admin')
            
        }
    }else {
    res.send('login')
   
}
}