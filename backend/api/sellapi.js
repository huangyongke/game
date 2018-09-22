var config = require('../config');
var fs = require('fs');
var path = require('path');
var Game = require('../proxy').Game;
var Sell = require('../proxy').Sell;
var Picture = require('../proxy').Picture;

var url = require('url');

exports.findAllGames = function(req, res) {
	var params = url.parse(req.url, true).query;
	countPerPage = parseInt(params.countPerPage)
	currentPage = parseInt(params.currentPage)
	game = params.game
	area = params.area
	startprice = params.startprice
	endprice = params.endprice
	sort = params.sort
	Sell.findAllGames(game,area,startprice,endprice,sort,countPerPage,currentPage,function(result){
		res.send(result)
	})
}

exports.findAllSellGame = function(req, res) {
	var sell_id = req.body.sell_id
	var game_id = req.body.game_id
	var area_id = req.body.area_id
	var category_id = req.body.category_id
	var state = req.body.state
	var recommend = req.body.recommend
	Sell.findAllSellGame(sell_id,game_id,area_id,category_id,state,recommend,function(result){
		res.send(result)
	})
}

exports.findRecommendGames = function(req, res) {
	var params = url.parse(req.url, true).query;
	Sell.findRecommendGames(function(result){
		res.send(result)
	})
}

exports.findNewGames = function(req, res) {
	var params = url.parse(req.url, true).query;
	Sell.findNewGames(function(result){
		res.send(result)
	})
}

exports.findAllGamesAndCount = function(req, res) {
	var params = url.parse(req.url, true).query;
	Sell.findAllGamesAndCount(params.countPerPage,params.currentPage,function(result){
		res.send(result)
	})
}

exports.findSellGameById = function(req, res) {
	var params = url.parse(req.url, true).query;
	Sell.findSellGameById(params.id,function(result){
		if(result.length>0){
			var id = result[0].id
			Picture.findPicturesById(id,function(images){
				result[0].images = images
				res.send(result)
			})
		}else{
			res.send(result)
		}
		
	})
}

exports.findSellGameAndCountById = function(req, res) {
	var params = url.parse(req.url, true).query;
	Sell.findSellGameAndCountById(params.id,function(result){
		res.send(result)
	})
}

exports.UpdateSellGame = function(req, res) {
	var id = req.body.sell_id
	var price = req.body.price
	var remark = req.body.remark
	var recommend = req.body.recommend
	Sell.updateSellGame(id,price,remark,recommend,function(result){
		res.send(result)
	})
}

exports.updateGameRecommend = function(req, res) {
	var id = req.body.id
	var recommend = req.body.recommend
	Sell.updateGameRecommendById(id,recommend,function(result){
		res.send('success')
	})
}

