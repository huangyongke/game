var Sell_record = require('../models').Sell_record;
var Sell = require('../models').Sell;
var Game = require('../models').Game;
var Picture = require('../models').Picture;
var Game_category = require('../models').Game_category
var War_zone = require('../models').War_zone
var Game_area = require('../models').Game_area
var Sequelize = require('sequelize');
var db = require('../models/index').DB;

exports.findAllGames = function (game, area,zone, start, end, sort, countPerPage, currentPage, callback) {
    var sql = "select sells.id as sell_id,sells.price as price, avatar,level,games.name ,game_categories.name as type,game_areas.area, " +
    "war_zones.id as zone_id,war_zones.name as zone " +
    "from sells, games left outer join game_areas on game_areas.id = games.gameAreaId " +
    "left outer join war_zones on war_zones.id = game_areas.warZoneId "+
    "left outer join game_categories on game_categories.id = war_zones.gameCategoryId "
    var where = " where games.id = sells.gameId and games.state = 1";
    //var where = "games.state = 1"
    if (game) {
        where += " and game_categories.id = " + game;
    }
    if (area) {
        where += " and game_areas.id = " + area;
    }
    if (zone) {
        where += " and war_zones.id = " + zone;
    }
    if (start) {
        where += " and sells.price >= " + start;
    }
    if (end && end != '以上') {
        where += " and sells.price <= " + end;
    }
    if (sort == 1) {
        where += " order by sells.price";
    }
    if (sort == 2) {
        where += " order by sells.updatedAt desc";
    }
    var limit = parseInt(countPerPage)
    var offset = countPerPage * (currentPage - 1)
    var limitsql = " LIMIT "+offset+","+limit +";";
    var sql1 = "select count(*) as count from sells, games left outer join game_areas on game_areas.id = games.gameAreaId " +
    "left outer join war_zones on war_zones.id = game_areas.warZoneId "+
    "left outer join game_categories on game_categories.id = war_zones.gameCategoryId "
    db.query(sql+where+limitsql).then(function(data){
        db.query(sql1+where).then(function(count){
            var result = {}
            result.count = count[0][0].count
            result.data = data[0]
            callback(result)
        })
    })
    // Game.findAndCountAll({
    //     include: [Sell,
    //         {
    //             model: Game_area,
    //             include: [{
    //                 model: Game_category
    //             }]
    //         }
    //     ],
    //     attributes: ['id', 'name', 'avatar', 'level', 'figure', 'weapons', 'rare_figure', 'rare_weapons', 'artifact', 'props'],
    //     where: Sequelize.literal(where),
    //     limit: countPerPage,
    //     offset: countPerPage * (currentPage - 1),
    //     raw: true
    // }).then(function (result) {
    //     results = {
    //         data: result.rows,
    //         count: result.count
    //     }
    //     callback(results)
    // });
}

exports.findAllSellGame = function (sell_id,game_id, area_id,zone_id,category_id,state,recommend, callback) {
    var sql = "select sells.id as sell_id,sells.price as price,recommend,sells.remark, avatar,level,account,games.name as game_name,games.state, games.id as game_id,game_categories.name as type,game_areas.area, " +
    "war_zones.id as zone_id,war_zones.name as zone " +
    "from sells, games left outer join game_areas on game_areas.id = games.gameAreaId " +
    "left outer join war_zones on war_zones.id = game_areas.warZoneId "+
    "left outer join game_categories on game_categories.id = war_zones.gameCategoryId "
    var where = " where games.id = sells.gameId";
    //var where = "games.state = 1"
    if (sell_id) {
        where += " and sells.id = " + sell_id;
    }
    if (game_id) {
        where += " and games.id = " + game_id;
    }
    if (zone_id) {
        where += " and war_zones.id = " + zone_id;
    }
    if (category_id) {
        where += " and game_categories.id = " + category_id;
    }
    if (state) {
        where += " and games.state = " + state;
    }
    if (recommend) {
        where += " and sells.recommend = " + recommend;
    }
    if (area_id) {
        where += " and game_areas.id = " + area_id;
    }
    where += " order by sells.updatedAt DESC"
    db.query(sql+where).then(function(data){
            callback(data[0])
    })
}


exports.findRecommendGames = function (callback) {
    Game.findAndCountAll({
        include: [{
                model: Sell,
                where: {
                    recommend: 2
                }
            },
            {
                model: Game_area,
                include: [{
                    model: War_zone,
                    include:[Game_category]
                }]
            }
        ],
        attributes: ['id', 'name', 'avatar', 'level', 'figure', 'weapons', 'rare_figure', 'rare_weapons', 'artifact', 'props'],
        where: {
            state: 1
        },
        limit: 4,
        order: [
            ['updatedAt', 'DESC']
        ],
        raw: true
    }).then(function (result) {
        callback(result)
    });
}

exports.findNewGames = function (callback) {
    Game.findAndCountAll({
        include: [{
                model: Sell,
            },
            {
                model: Game_area,
                include: [{
                    model: War_zone,
                    include:[Game_category]
                }]
            }
        ],
        attributes: ['id', 'name', 'avatar', 'level', 'figure', 'weapons', 'rare_figure', 'rare_weapons', 'artifact', 'props'],
        where: {
            state: 1
        },
        limit: 4,
        order: [
            ['updatedAt', 'DESC']
        ],
        raw: true
    }).then(function (result) {
        callback(result)
    });
}

exports.findAllGamesAndCount = function (countPerPage, currentPage, callback) {
    Sell.findAndCountAll({
        include: [{
            model: Game,
            required: false,
            where: {
                state: 1
            }
        }],
        limit: countPerPage,
        offset: countPerPage * (currentPage - 1),
        raw: true
    }).then(function (result) {
        results = {
            data: result.rows,
            count: result.count
        }
        callback(results)
    });
}

exports.findSellGameById = function (id, callback) {
    Game.findAll({
        include: [{
                model: Sell,
                where: {
                    id: id
                },
            },
            {
                model: Game_area,
                include: [{
                    model: War_zone,
                    include:[Game_category]
                }]
            }
        ],
        attributes: ['id', 'name', 'avatar','account', 'level', 'figure', 'weapons', 'rare_figure', 'rare_weapons', 'artifact', 'props', 'introduction', 'state'],
        raw: true
    }).then(function (result) {
        callback(result)
    });
}

exports.findSellGameAndCountById = function (id, callback) {
    Sell.findAll({
        include: [{
            model: Game,
            required: false,
            where: {
                state: 1
            }
        }],
        where: {
            id: id
        },
        raw: true
    }).then(function (result) {
        callback(result)
    });
}

exports.addSellGame = async function (game_id, price, remark, callback) {
    game = await Game.findById(game_id)
    game.createSell({
        recommend:1,
        price: price,
        remark: remark
    }).then(function (result) {
        callback(result)
    });
}

exports.updateGameRecommendById = async function (sell_id, recommend,callback) {
    Sell.update({
        recommend:recommend,
    },{
        where:{
            id:sell_id
        }
    }).then(function (result) {
        callback(result)
    });
}

exports.removeSellGame = function (id, callback) {
    Sell.destroy({
        where: {
            id: id
        }
    }).then(function (result) {
        callback(result)
    });
}

exports.updateSellGame = function (id, price, remark,recommend, callback) {
    Sell.update({
        price: price,
        remark: remark,
        recommend:recommend,
    },{
        where: {
        id: id
        }
    }).then(function (result) {
        callback(result)
    });
}