var Game = require('../models').Game;
var Game_area = require('../models').Game_area;
var Game_category = require('../models').Game_category;
var Picture = require('../models').Picture;
var Sequelize = require('sequelize');
var db = require('../models/index').DB;



// exports.findAllGames = function(countPerPage,currentPage,callback){
//     Game.findAndCountAll({
//         where:{
//             state:1
//         },
//         attributes: ['id','avatar','name','level','figure','weapons','rare_figure','rare_weapons','artifact','props'],
//         limit:countPerPage,
//         offset: countPerPage * (currentPage - 1),
//         raw:true
//     }).then(function(result){
//         results = {
//             data: result.rows,
//             count: result.count
//         }
//         callback(results)
//     });
// }



exports.findAllGamesAndCount = function(game_id,type_id,area_id,game_name,account,state,callback){
    var sql = "select *,games.id as game_id,games.name as game_name,game_areas.id as area_id,game_categories.name as type,game_categories.id as type_id from games left outer join game_areas on games.gameAreaId = game_areas.id left outer join " +
    "game_categories on game_categories.id = game_areas.gameCategoryId "
    var where = "where 1 = 1";
      if(game_id){
          where += " and games.id = " + game_id; 
      }
      if(game_name){
        where += " and games.name like '%" + game_name +"%'"; 
    }
      if(account){
          where += " and games.account like '%" + account +"%'"; 
      }
      if(type_id){
          where += " and game_categories.id = " + type_id; 
      }
      if(area_id){
          where += " and game_areas.id = " + area_id;
      }
      if(state){
        where += " and games.state = " + state;
    }
    where += " order by games.updatedAt DESC"
      db.query(sql+where).then(function(result){
        callback(result[0])
    })
    // Game.findAll({
    //     include:[{
    //         model:Game_area,
    //         include:[Game_category],
    //         where:Sequelize.literal(where),
    //     }],
    //     raw:true
    // }).then(function(result){
        
    //     callback(result)
    // });
}

exports.findGameById = function(id,callback){
    Game.findAll({
        attributes: ['id','avatar','account','name','level','figure','weapons','rare_figure','rare_weapons','artifact','props','introduction','state'],
        where:{
            id: id
        },
        raw:true
    }).then(function(result){
        Picture.findAll({
            include:[{
                model: Game,
                required: false,
                where:{
                    id:id
                }
            }],
            raw:true
        }).then(function(data){
            result.images = data
            callback(result)
        })
        
    });
}

exports.findGameByArea = function(area_id,callback){
    Game.findAll({
        include:[{
            model:Game_area,
            where:{
                id:area_id
            }
        }],
        attributes: ['id','avatar','name','level','figure','weapons','rare_figure','rare_weapons','artifact','props','introduction','state'],
        raw:true
    }).then(function(result){
            callback(result)
    });
}

exports.AddGame = async function(area_id,name,avatar,account,password,level,figure,weapons,rare_figure,rare_weapons,artifact,props,introduction,callback){
    var game_area = await Game_area.findById(area_id)
    
    var game = await game_area.createGame({
        name:name,
        avatar:avatar,
        account:account,
        password:password,
        level:level,
        figure:figure,
        weapons:weapons,
        rare_figure:rare_figure,
        rare_weapons:rare_weapons,
        artifact:artifact,
        props:props,
        introduction:introduction,
        state:1,
    }).then(function(result){
        callback(result)
    });
    //await game_area.addGame(game);
}

exports.DeleteGame = function(id,callback){
    Game.destroy({
        where: {
          id: id
        }
      }).then(function(result){
        callback(result)
      });
}

exports.updateGameById = function (id,area_id,name,avatar,account,password,level,figure,weapons,rare_figure,rare_weapons,artifact,props,introduction,callback) {
    Game.update({
        name:name,
        avatar:avatar,
        account:account,
        password:password,
        level:level,
        figure:figure,
        weapons:weapons,
        rare_figure:rare_figure,
        rare_weapons:rare_weapons,
        artifact:artifact,
        props:props,
        introduction:introduction,
        gameAreaId:area_id
    }, {
      where: {
        id: id
      }
    }).then(function(result){
      callback(result)
    });
  };

  exports.updateGameStateById = function (id,state,callback) {
    Game.update({
        state:state,
    }, {
      where: {
        id: id
      }
    }).then(function(result){
      callback(result)
    });
  };

exports.addPictureById= async function(game_id,image,callback){
    var game = await Game.findById(game_id)
    game.createPicture({
        image:image
    }).then(function(data){
        callback(data)
    })
}

