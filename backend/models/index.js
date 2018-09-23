// var mongoose = require('mongoose');
// var config   = require('../config');

// mongoose.connect(config.db, {
//   server: {poolSize: 20}
// }, function (err) {
//   if (err) {
//      console.log('database error')
//   }
// });

// require('./testdb')
// console.log('database connection')

// exports.Test = mongoose.model('Test');

// db.js

var Sequelize = require('sequelize');
var db   = require('../config').db;

/*
// new Sequelize(database, [username=null], [password=null], [options={}])
// class Sequelize 接收4个参数，后三个参数是可选的

// 通过uri连接数据库
var sequelize = new Sequelize('mysql://localhost:3306/database', {})
*/

exports.DB = new Sequelize(db.database, db.user, db.password, {
    host: db.host, // 数据库地址
    dialect: db.dialect, // 指定连接的数据库类型
    pool: db.pool
});

console.log('database connection')


exports.User = require('./user');
exports.Game_category = require('./game_category');
exports.War_zone = require('./war_zone');
exports.Game_area = require('./game_area');
exports.Game = require('./game');
exports.Sell = require('./sell');
exports.Buy = require('./buy');
exports.Sell_record = require('./sell_record');
exports.Buy_record = require('./buy_record');
exports.Picture = require('./picture');
