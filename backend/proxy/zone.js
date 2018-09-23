var Game_area = require('../models').Game_area;
var War_zone = require('../models').War_zone;
var Game_category = require('../models').Game_category;
var Sequelize = require('sequelize');

exports.findzones = function(game,callback){
    War_zone.findAll({
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

exports.findzonesById = function(id,zone_id,name,callback){
    var where = "1 = 1 ";
      if(zone_id){
          where += " and war_zone.id = " + zone_id; 
      }
      if(name){
        where += " and name like '%" + name +"%'"; 
    }
    War_zone.findAll({
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

exports.findZoneUnique = function(category_id,name,callback){
    War_zone.findOne({
        include:[{
            model:Game_category,
            where:{
                id:category_id
            }
        }],
        where:{
            name:name
        },
        raw:true
    }).then(function(result){
        callback(result)
    });
}

exports.addWarZone = async function(category_id,name,callback){
    var game_category = await Game_category.findById(category_id)
    game_category.createWar_zone({
        name:name
    }).then(function(result){
        callback(result)
    });
}

exports.updateWarZone = function(id,name,callback){
    War_zone.update({
        name:name
    },{
        where:{
            id:id
        }
    }).then(function(result){
        callback(result)
    });
}

exports.deleteWarZone = function(id,callback){
    War_zone.destroy({
        where:{
            id:id
        }
    }).then(function(result){
        callback(result)
    });
}