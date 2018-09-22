var Sequelize = require('sequelize');
var db = require('./index').DB;
var Game_category = require('./index').Game_category
var Game_area = require('./index').Game_area

// 创建 model
var Game = db.define('game', {
    name: {
        type: Sequelize.STRING // 指定值的类型
    },
    avatar:{
        type:Sequelize.STRING
    },
    account:{
        type: Sequelize.STRING
    },
    password:{
        type:Sequelize.STRING
    },
    level:{//等级
        type:Sequelize.INTEGER
    },
    figure:{//角色
        type:Sequelize.STRING
    },
    weapons:{//武器
        type:Sequelize.STRING
    },
    rare_figure:{//稀有角色
        type:Sequelize.STRING
    },
    rare_weapons:{//稀有武器
        type:Sequelize.STRING
    },
    artifact:{//神器
        type:Sequelize.STRING
    },
    props:{//道具
        type:Sequelize.STRING
    },
    introduction: {
        type: Sequelize.STRING
    },
    state:{
        type:Sequelize.INTEGER//2:禁售 1:未售 3：已售
    },
    // 没有指定 field，表中键名称则与对象键名相同，为 email
}, {
    // 如果为 true 则表的名称和 model 相同，即 user
    // 为 false MySQL创建的表名称会是复数 users
    // 如果指定的表名称本就是复数形式则不变
    freezeTableName: false
});



Game_area.hasMany(Game)
Game.belongsTo(Game_area)
// 前者将拥有后者的get/set/add方法,后者id是前者外键

// 创建表
// User.sync() 会创建表并且返回一个Promise对象
// 如果 force = true 则会把存在的表（如果users表已存在）先销毁再创建表
// 默认情况下 forse = false
var game = Game.sync({ force: false });

module.exports = Game; 