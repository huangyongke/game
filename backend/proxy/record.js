var Sell_record = require('../models').Sell_record;
var Buy_record = require('../models').Buy_record;
var Game = require('../models').Game;
var Game_area = require('../models').Game_area;
var User = require('../models').User;
var Game_category = require('../models').Game_category;
var db = require('../models/index').DB;
var formatDate = require('../utils/index').formatDate
var Sequelize = require('sequelize');

// 添加新用户
exports.findAllSellRecord = function(sell_id,game_id,user_id,user_name,category_id,zone_id,area_id,start_time,end_time, callback) {
    // 向 user 表中插入数据
    var sql = "select sell_records.id as sell_id,paysapi_id,price,realprice,sell_records.remark as remark, sell_records.updatedAt as time,games.password as password,account, games.id as game_id,games.name as " +
    "game_name,game_areas.id,area,game_categories.id,game_categories.name as type,users.name as user_name,war_zones.id as zone_id,war_zones.name as zone from " + 
    "sell_records left outer join games on sell_records.gameId = games.id  left outer join game_areas on game_areas.id = games.gameAreaId left outer join war_zones on war_zones.id = game_areas.warZoneId left outer join game_categories on game_categories.id = war_zones.gameCategoryId left outer join users on users.id = sell_records.userId"
    var where = " where 1 = 1 ";
      if(sell_id){
          where += " and sell_records.id = " + sell_id; 
      }
      if(game_id){
        where += " and games.id = " + game_id; 
    }
      if(user_id){
        where += " and users.id = " + user_id ; 
    }
    if(user_name){
        where += " and users.name like '%" + user_name +"%'"; 
    }
       if(category_id){
           where += " and game_categories.id = " + category_id; 
       }
      if(area_id){
          where += " and game_areas.id = " + area_id; 
      }
      if(zone_id){
        where += " and war_zones.id = " + zone_id; 
    }
      if(start_time){
          where += " and sell_records.updatedAt >= '" +start_time +"'"
      }
      if(end_time){
        where += " and sell_records.updatedAt <= '" +end_time +"'"
    }
        where +=" order by sell_records.updatedAt DESC"
      db.query(sql+where).then(function(data){
        callback(data[0])
    })
    // Sell_record.findAll({
    //     include:[{
    //         model: Game,
    //         include:[{
    //             model:Game_area,
    //             include:[Game_category]
    //         }],
    //         attributes:['id','avatar','name','level','figure','weapons','rare_figure','rare_weapons','artifact','props','introduction','state'],
    //     },User],
    //     where:Sequelize.literal(where),
    //     raw:true
    // }).then(function(result){
    //     callback(result)
    // })
};


exports.addSellRecord = async function(user_id,game_id,paysapi_id,realprice,price,remark,callback){
    // var now = formatDate(new Date(),"yyyy-MM-dd hh:mm:ss")
    // var sql="insert into sell_records values(" +price+",'"+remark+"','"+now+"','"+now+"',"+user_id+","+game_id+ ")"
    // db.query(sql).then(function(data){
    //     callback(data)
    // })
    var game = await Game.findById(game_id)
    var user = await User.findById(user_id)
    var sell_record = await game.createSell_record({
        paysapi_id:paysapi_id,
        realprice,realprice,
        price:price,
        remark:remark
    })
    user.addSell_record(sell_record).then(function(data){
        callback(data)
    })
}

exports.findAllBuyRecord = function(buy_id,game_id,user_id,user_name,category_id,zone_id,area_id,start_time,end_time,callback) {
    var sql = "select buy_records.id as buy_id,price,buy_records.remark as remark, buy_records.updatedAt as time,games.password as password,account, games.id as game_id,games.name as " +
    "game_name,game_areas.id,area,game_categories.id,game_categories.name as type,users.name as user_name,war_zones.id as zone_id,war_zones.name as zone from " + 
    "buy_records left outer join games on buy_records.gameId = games.id left outer join game_areas on game_areas.id = games.gameAreaId left outer join war_zones on war_zones.id = game_areas.warZoneId left outer join game_categories on game_categories.id = war_zones.gameCategoryId left outer join users on users.id = buy_records.userId"
    var where = " where 1 = 1 ";
      if(buy_id){
          where += " and buy_records.id = " + buy_id; 
      }
      if(game_id){
        where += " and games.id = " + game_id; 
    }
      if(user_id){
        where += " and users.id = " + user_id ; 
    }   
    if(user_name){
        where += " and users.name like '%" + user_name +"%'"; 
    }
       if(category_id){
           where += " and game_categories.id = " + category_id; 
       }
       if(zone_id){
        where += " and war_zones.id = " + zone_id; 
    }
      if(area_id){
          where += " and game_areas.id = " + area_id; 
      }
      if(start_time){
          where += " and buy_records.updatedAt >= '" +start_time +"'"
      }
      if(end_time){
        where += " and buy_records.updatedAt <= '" +end_time +"'"
    }
    where +=" order by buy_records.updatedAt DESC"
      db.query(sql+where).then(function(data){
        callback(data[0])
    })
    // Buy_record.findAll({
    //     include:[{
    //         model: Game,
    //         required: false,
    //         attributes:['name','level','figure','weapons','rare_figure','rare_weapons','artifact','props']
    //     }],
    //     limit:countPerPage,
    //     offset: countPerPage * (currentPage - 1),
    //     raw:true
    // }).then(function(result){
    //     callback(result)
    // })
};

exports.addBuyRecord = async function(user_id,game_id,price,remark,callback){
    // var now = formatDate(new Date(),"yyyy-MM-dd hh:mm:ss")
    // var sql="insert into buy_records values(" +price+",'"+remark+"','"+now+"','"+now+"',"+user_id+","+game_id+ ")"
    // db.query(sql).then(function(data){
    //     callback(data)
    // })
    var game = await Game.findById(game_id)
    var user = await User.findById(user_id)
    var buy_record = await game.createBuy_record({
        price:price,
        remark:remark
    })
    user.addBuy_record(buy_record).then(function(data){
        callback(data)
    })
}