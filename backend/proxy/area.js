var Game_area = require('../models').Game_area;
var War_zone = require('../models').War_zone;
var Game_category = require('../models').Game_category;
var Sequelize = require('sequelize');

// exports.findAreas = function(game,callback){
//     Game_area.findAll({
//         include:[{
//             model:Game_category,
//             where:{
//                 name:game
//             }
//         }],
//         raw:true
//     }).then(function(result){
//         callback(result)
//     });
// }

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
            model:War_zone,
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

exports.findGameAreaUnique = function(zone_id,name,callback){
    Game_area.findOne({
        include:[{
            model:War_zone,
            where:{
                id:zone_id
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

exports.addGameArea = async function(zone_id,name,callback){
    var war_zone = await War_zone.findById(zone_id)
    war_zone.createGame_area({
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