var config = require('../config');
var fs = require('fs');
var path = require('path');
var Game = require('../proxy').Game;
var Buy = require('../proxy').Buy;
var url = require('url');

exports.findAllGames = function(req, res) {
	var params = url.parse(req.url, true).query;
	Buy.findAllGamesAndCount(params.countPerPage,params.currentPage,function(result){
		res.send(result)
	})
}

exports.findAllBuyGame = function(req, res) {
	var user_name = req.body.username
	var account = req.body.account
	var area_id = req.body.area_id == 'undefined' ?  null : req.body.area_id
	var zone_id = req.body.zone_id == 'undefined' ?  null : req.body.zone_id
	var category_id = req.body.category_id == 'undefined' ?  null : req.body.category_id
	var buy_id = req.body.buy_id
	Buy.findAllBuyGame(buy_id,user_name,account,area_id,zone_id,category_id,function(result){
		res.send(result)
	})
}

exports.findBuyGameById = function(req, res) {
	var params = url.parse(req.url, true).query;
	Sell.findSellGameAndCountById(params.id,function(result){
		res.send(result)
	})
}

exports.removeGame = function(req, res) {
	var id = req.body.id
	Buy.removeBuyGame(id,function(result){
		res.send('success')
	})
}

exports.AddBuyGame = function(req, res) {
	var id = req.session.user.id
	var area_id = req.body.area_id
	var account = req.body.account
	var password = req.body.password
	var remark = req.body.remark
	Buy.addBuyGame(id,area_id,account,password,remark,function(result){
		res.send('success')
	})
}

exports.UpdateBuyGame = function(req, res) {
	var params = url.parse(req.url, true).query;
	Buy.updateBuyGame(params.id,params.acount,params.password,params.remark,function(result){
		res.send('success')
	})
}

