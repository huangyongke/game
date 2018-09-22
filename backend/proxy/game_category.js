var Game_area = require('../models').Game_area;
var Game_category = require('../models').Game_category;
var Sequelize = require('sequelize');

exports.findGameCategory = function(id,name,callback){
    var where = "1 = 1 ";
      if(id){
          where += " and id = " + id; 
      }
      if(name){
        where += " and name like '%" + name +"%'"; 
    }
    Game_category.findAll({
        where:Sequelize.literal(where),
        order: ['id'
        ],
        raw:true
    }).then(function(result){
        callback(result)
    });
}

exports.findGameCategoryByName = function(name,callback){
    Game_category.findOne({
        where:{
            name:name
        },
        raw:true
    }).then(function(result){
        callback(result)
    });
}

exports.addGameCategory = function(name,callback){
    Game_category.create({
        name:name
    }).then(function(result){
        callback(result)
    });
}

exports.updateGameCategory = function(id,name,callback){
    Game_category.update({
        name:name
    },{
        where:{
            id:id
        }
    }).then(function(result){
        callback(result)
    });
}

exports.deleteGameCategory = function(id,callback){
    Game_category.destroy({
        where:{
            id:id
        }
    }).then(function(result){
        callback(result)
    });
}