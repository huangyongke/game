var Game_area = require('../models').Game_area;
var Game_category = require('../models').Game_category;
var Sequelize = require('sequelize');

exports.findAreas = function(game,callback){
    Game_area.findAll({
        include:[{
            model:Game_category,
            where:{
                name:game
            }
        }],
        raw:true
    }).then(function(result){
        callback(result)
    });
}

exports.findAreasById = function(id,area_id,name,callback){
    var where = "1 = 1 ";
      if(area_id){
          where += " and game_area.id = " + area_id; 
      }
      if(name){
        where += " and area like '%" + name +"%'"; 
    }
    Game_area.findAll({
        include:[{
            model:Game_category,
            where:{
                id:id
            }
        }],
        order: ['id'
        ],
        where:Sequelize.literal(where),
        raw:true
    }).then(function(result){
        callback(result)
    });
}

exports.findGameAreaUnique = function(category_id,name,callback){
    Game_area.findOne({
        include:[{
            model:Game_category,
            where:{
                id:category_id
            }
        }],
        where:{
            area:name
        },
        raw:true
    }).then(function(result){
        callback(result)
    });
}

exports.addGameArea = async function(category_id,name,callback){
    var game_category = await Game_category.findById(category_id)
    game_category.createGame_area({
        area:name
    }).then(function(result){
        callback(result)
    });
}

exports.updateGameArea = function(id,name,callback){
    Game_area.update({
        area:name
    },{
        where:{
            id:id
        }
    }).then(function(result){
        callback(result)
    });
}

exports.deleteGameArea = function(id,callback){
    Game_area.destroy({
        where:{
            id:id
        }
    }).then(function(result){
        callback(result)
    });
}