var User = require('../proxy').User;
var url = require('url');

exports.registered = function (req, res) {
    var name = req.body.name;
    var password = req.body.password;
    var phone = req.body.phone;
    var email = req.body.email;
    var qq = req.body.qq;
    var weixin = req.body.weixin;
    User.findOneUserByName(name, function (data) {
        if (data) {
            res.send('1')
        } else {
            User.AddUser(name, password, phone, email, qq, weixin, function (result) {
                res.send(result)
            })
        }
    })

}

exports.singin = function (req, res) {
    var name = req.body.name;
    var password = req.body.password;
    User.findOneUserByName(name, function (user) {
        if (user) {
            if (user.password == password) {
                data = {}
                data.id = user.id;
                data.name = user.name;
                data.admin = user.admin;
                req.session.user = data;
                res.send(data)
            } else {
                res.send('1')
            }
        } else {
            res.send('2')
        }
    })
}

exports.updateUserInfo = function (req, res) {
    if (req.session.user) {
        var id = req.session.user.id
        var name = req.body.name;
        var phone = req.body.phone;
        var email = req.body.email;
        var qq = req.body.qq;
        var weixin = req.body.weixin;
        User.updateUserById(id, name, phone, email, qq, weixin, function (result) {
            console.log(result)
            res.send(result)
        })
    } else {
        res.send('login')
    }
}

exports.modifyPassword = function (req, res) {
    if (req.session.user) {
        var id = req.session.user.id
        var old_password = req.body.old_password;
        var new_password = req.body.new_password;
        User.findOneUserById(id, function (user) {
            if (user) {
                if (user.password == old_password) {
                    User.updatePasswordById(id, new_password, function (result) {
                        res.send('success')
                    })
                } else {
                    res.send('1')
                }
            } else {
                res.send('login')
            }
        })
    } else {
        res.send('login')
    }


}

exports.forgetPassword = function (req, res) {
    var name = req.body.name;
    var phone = req.body.phone;
    var password = req.body.password;
    User.findOneUserByName(name, function (user) {
        if (user) {
            if (user.phone == phone) {
                User.updatePasswordById(user.id, password, function (result) {
                    res.send('success')
                })
            } else {
                res.send('1')
            }
        } else {
            res.send('0')
        }

    })

}

exports.modifyadmin = function (req, res) {
    var id = req.body.id;
    var admin = req.body.admin;
    var user = req.session.user
    if (user['admin'] == 1) {
        User.updateAdminById(id, admin, function (result) {
            res.send(result)
        })
    } else {
        res.send('fail')
    }
}

exports.findUserById = function (req, res) {
    if (req.session.user) {
        var id = req.session.user.id
        User.findUserById(id, function (result) {
            res.send(result)
        })
    } else {
        res.send('login')
    }
}

exports.findAllUsers = function (req, res) {
    if (req.session.user) {
        var user_id = req.body.user_id
        var name = req.body.name;
        var phone = req.body.phone;
        var email = req.body.email;
        var admin = req.body.admin;
        User.findAllUsers(user_id,name,phone,email,admin,function (result) {
            res.send(result)
        })
    } else {
        res.send('login')
    }
}

exports.findSession = function (req, res) {
    if (req.session.user) {
        res.send(req.session.user)
    } else {
        res.send('login')
    }
}

exports.deleteSession = function (req, res) {
    req.session.user = ''
    res.send('success')
}

