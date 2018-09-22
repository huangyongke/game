var User = require('../models').User;
var Sequelize = require('sequelize');

// // 添加新用户
// exports.addTest = function() {
//     // 向 user 表中插入数据
//     console.log(Test)
//     return Test.create({
//         name: 'okok',
//         email: '@qq.com'
//     });
// };

exports.findOneUserByNamePassword = function(name,password,callback){
    User.findOne({
        where:{
            name:name,
            password:password
        },
        raw:true
    }).then(function(result){
        callback(result)
    })
}

exports.findOneUserById = function(id,callback){
    User.findOne({
        where:{
            id:id,
        },
        raw:true
    }).then(function(result){
        callback(result)
    })
}

exports.findOneUserByName = function(name,callback){
    User.findOne({
        where:{
            name:name
        },
        raw:true
    }).then(function(result){
        callback(result)
    })
}

exports.findAllUsers = function(user_id,name,phone,email,admin,callback){
    var where = "1 = 1 ";
      if(user_id){
          where += " and id = " + user_id; 
      }
      if(name){
        where += " and name like '%" + name +"%'"; 
    }
      if(phone){
          where += " and phone = " + phone; 
      }
      if(email){
          where += " and email like '%" + email + "%'"; 
      }
      if(admin){
          where += " and admin = " + admin;
      }else if(admin === 0){
        where += " and admin = " + admin;
        }
    User.findAll({
        attributes: ['id','name','phone','email','qq','weixin','admin'],
        where:Sequelize.literal(where),
        order: ['id'],
        raw:true
    }).then(function(result){
        callback(result)
    });
}

exports.findUserById = function(id,callback){
    User.findById(id,{
        attributes: ['id','name','phone','email','qq','weixin','admin'],
        raw:true
    }).then(function(result){
        callback(result)
    });
}

exports.AddUser = function(name,password,phone,email,qq,weixin,callback){
    User.create({
        name:name,
        password:password,
        phone:phone,
        email:email,
        qq:qq,
        weixin:weixin,
        admin: 0
    }).then(function(result){
        callback(result)
    });
}

exports.DeleteUserById = function(id,callback){
    User.destroy({
        where: {
          id: id
        }
      }).then(function(result){
        callback(result)
      });
}

exports.updateUserById = function (id,name,phone,email,qq,weixin,callback) {
    User.update({
        name:name,
        phone:phone,
        email:email,
        qq:qq,
        weixin:weixin,
    }, {
      where: {
        id: id
      }
    }).then(function(result){
      callback(result)
    });
  };

  exports.updatePasswordById = function (id,password,callback) {
    User.update({
        password:password,
    }, {
      where: {
        id: id
      }
    }).then(function(result){
      callback(result)
    });
  };

  exports.updateAdminById = function (id,admin,callback) {
    User.update({
        admin:admin,
    }, {
      where: {
        id: id
      }
    }).then(function(result){
      callback(result)
    });
  };