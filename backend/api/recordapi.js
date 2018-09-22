var Record = require('../proxy').Record;
var url = require('url');

exports.findBuyRecords = function(req, res) {
	var user_id = req.session.user.id
	var user_name = req.body.user_name ? req.body.user_name : null
	var buy_id = req.body.buy_id ? req.body.buy_id : null
	var category_id = req.body.category_id ? req.body.category_id : null
	var area_id = req.body.area_id ? req.body.area_id : null
	var game_id = req.body.game_id ? req.body.game_id : null
	var start_time = req.body.start_time ? req.body.start_time : null
	var end_time = req.body.end_time ? req.body.end_time : null
	Record.findAllBuyRecord(buy_id,game_id,user_id,user_name,category_id,area_id,start_time,end_time,function(result){
		res.send(result)
	})
}

exports.findAllBuyRecords = function(req, res) {
	var user_id = req.body.user_id
	var user_name = req.body.user_name ? req.body.user_name : null
	var buy_id = req.body.buy_id ? req.body.buy_id : null
	var category_id = req.body.category_id ? req.body.category_id : null
	var area_id = req.body.area_id ? req.body.area_id : null
	var game_id = req.body.game_id ? req.body.game_id : null
	var start_time = req.body.start_time ? req.body.start_time : null
	var end_time = req.body.end_time ? req.body.end_time : null
	Record.findAllBuyRecord(buy_id,game_id,user_id,user_name,category_id,area_id,start_time,end_time,function(result){
		res.send(result)
	})
}

exports.findAllSellRecords = function(req, res) {
	var user_id = req.body.user_id
	var user_name = req.body.user_name ? req.body.user_name : null
	var sell_id = req.body.sell_id ? req.body.sell_id : null
	var game_id = req.body.game_id ? req.body.game_id : null
	var category_id = req.body.category_id ? req.body.category_id : null
	var area_id = req.body.area_id ? req.body.area_id : null
	var start_time = req.body.start_time ? req.body.start_time : null
	var end_time = req.body.end_time ? req.body.end_time : null
	Record.findAllSellRecord(sell_id,game_id,user_id,user_name,category_id,area_id,start_time,end_time,function(result){
		res.send(result)
	})
}

exports.findSellRecords = function(req, res) {
	var user_id = req.session.user.id
	var user_name = req.body.user_name ? req.body.user_name : null
	var sell_id = req.body.sell_id ? req.body.sell_id : null
	var game_id = req.body.game_id ? req.body.game_id : null
	var category_id = req.body.category_id ? req.body.category_id : null
	var area_id = req.body.area_id ? req.body.area_id : null
	var start_time = req.body.start_time ? req.body.start_time : null
	var end_time = req.body.end_time ? req.body.end_time : null
	Record.findAllSellRecord(sell_id,game_id,user_id,user_name,category_id,area_id,start_time,end_time,function(result){
		res.send(result)
	})
}

