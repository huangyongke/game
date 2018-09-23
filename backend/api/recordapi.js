var Record = require('../proxy').Record;
var url = require('url');

exports.findBuyRecords = function(req, res) {
	var user_id = req.session.user.id
	var user_name = req.body.user_name ? req.body.user_name : null
	var buy_id = req.body.buy_id ? req.body.buy_id : null
	var category_id = req.body.category_id == 'undefined' ? null : req.body.category_id
	var zone_id = req.body.zone_id == 'undefined' ? null : req.body.zone_id
	var area_id = req.body.area_id == 'undefined' ? null : req.body.area_id
	var game_id = req.body.game_id ? req.body.game_id : null
	var start_time = req.body.start_time ? req.body.start_time : null
	var end_time = req.body.end_time ? req.body.end_time : null
	Record.findAllBuyRecord(buy_id,game_id,user_id,user_name,category_id,zone_id,area_id,start_time,end_time,function(result){
		res.send(result)
	})
}

exports.findAllBuyRecords = function(req, res) {
	var user_id = req.body.user_id
	var user_name = req.body.user_name ? req.body.user_name : null
	var buy_id = req.body.buy_id ? req.body.buy_id : null
	var category_id = req.body.category_id == 'undefined' ? null : req.body.category_id
	var zone_id = req.body.zone_id == 'undefined' ? null : req.body.zone_id
	var area_id = req.body.area_id == 'undefined' ? null : req.body.area_id
	var game_id = req.body.game_id ? req.body.game_id : null
	var start_time = req.body.start_time ? req.body.start_time : null
	var end_time = req.body.end_time ? req.body.end_time : null
	Record.findAllBuyRecord(buy_id,game_id,user_id,user_name,category_id,zone_id,area_id,start_time,end_time,function(result){
		res.send(result)
	})
}

exports.findAllSellRecords = function(req, res) {
	var user_id = req.body.user_id
	var user_name = req.body.user_name ? req.body.user_name : null
	var sell_id = req.body.sell_id ? req.body.sell_id : null
	var game_id = req.body.game_id ? req.body.game_id : null
	var category_id = req.body.category_id == 'undefined' ? null : req.body.category_id
	var zone_id = req.body.zone_id == 'undefined' ?  null : req.body.zone_id
	var area_id = req.body.area_id == 'undefined' ? null : req.body.area_id
	var start_time = req.body.start_time ? req.body.start_time : null
	var end_time = req.body.end_time ? req.body.end_time : null
	Record.findAllSellRecord(sell_id,game_id,user_id,user_name,category_id,zone_id,area_id,start_time,end_time,function(result){
		res.send(result)
	})
}

exports.findSellRecords = function(req, res) {
	var user_id = req.session.user.id
	var user_name = req.body.user_name ? req.body.user_name : null
	var sell_id = req.body.sell_id ? req.body.sell_id : null
	var game_id = req.body.game_id ? req.body.game_id : null
	var category_id = req.body.category_id == 'undefined' ? null : req.body.category_id
	var zone_id = req.body.zone_id == 'undefined' ? null : req.body.zone_id
	var area_id = req.body.area_id == 'undefined' ? null : req.body.area_id
	var start_time = req.body.start_time ? req.body.start_time : null
	var end_time = req.body.end_time ? req.body.end_time : null
	Record.findAllSellRecord(sell_id,game_id,user_id,user_name,category_id,zone_id,area_id,start_time,end_time,function(result){
		res.send(result)
	})
}

