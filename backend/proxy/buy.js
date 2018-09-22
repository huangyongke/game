var Buy = require('../models').Buy;
var User = require('../models').User;
var Game_area = require('../models').Game_area;
var db = require('../models/index').DB;
var formatDate = require('../utils/index').formatDate

exports.findAllGamesAndCount = function(countPerPage,currentPage,callback){
    Buy.findAndCountAll({
        include:[{
            model: User,
            required: false,
            attributes: ['id','name','phone','email','qq','weixin'],
        }], 
        limit:countPerPage,
        offset: countPerPage * (currentPage - 1),
        raw:true
    }).then(function(result){
        results = {
            data: result.rows,
            count: result.count
        }
        callback(results)
    });
}

exports.findAllBuyGame = function (buy_id,user_name,account, area_id,category_id, callback) {
    var sql = "select buys.id as buy_id,account,buys.password,buys.remark,game_categories.name as type,game_categories.id as type_id,game_areas.area,game_areas.id as area_id,users.name as user_name,users.id as user_id "+
    "from buys left outer join game_areas on buys.gameAreaId = game_areas.id left outer join game_categories on game_categories.id = game_areas.gameCategoryId,users "
    var where = "where users.Id = buys.userId "
    
    //var where = "games.state = 1"
    if (buy_id) {
        where += " and buys.id = " + buy_id;
    }
    if (user_name) {
        where += " and users.name like '%" + user_name+"%'";
    }
    if (category_id) {
        where += " and game_categories.id = " + category_id;
    }
    if (account) {
        where += " and buys.account like '%" + account+"%'";
    }
    if (area_id) {
        where += " and game_areas.id = " + area_id;
    }
    db.query(sql+where).then(function(data){
            callback(data[0])
    })
}

exports.addBuyGame = async function(user_id,area_id,account,password,remark,callback){
    if(!remark){
        remark = ""
    }
            var now = formatDate(new Date(),"yyyy-MM-dd hh:mm:ss")
            var sql = "insert into buys(account,password,remark,createdAt,updatedAt,userId,gameAreaId) values('" + account+"','"+password+"','"+remark+"','"+now+"','"+now +"',"+user_id+","+area_id +");"
            db.query(sql).then(function(data){
                callback(data)
    })
}

exports.removeBuyGame = function(id,callback){
    Buy.destroy({
        where:{
            id:id
        }
    }).then(function(result){
        callback(result)
    });
}

exports.updateBuyGame = function(id,acount,password,remark,callback){
    Sell.update({
        acount:acount,
        password:password,
        remark:remark,
        where:{
            id:id
        }
    }).then(function(result){
        callback(result)
    });
}