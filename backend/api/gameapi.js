var config = require('../config');
var fs = require('fs');
var path = require('path');
var Game = require('../proxy').Game;
var Sell = require('../proxy').Sell;
var Buy = require('../proxy').Buy;
var Record = require('../proxy').Record;
var Picture = require('../proxy').Picture;
var url = require('url');
var formatDate = require('../utils/index').formatDate
var getMD5 = require('../utils/index').getMD5
// exports.findAllGames = function(req, res) {
// 	var params = url.parse(req.url, true).query;
// 	Game.findAllGames(params.countPerPage,params.currentPage,function(result){
// 		res.send(result)
// 	})
// }


exports.findAllGamesAndCount = function (req, res) {
	var game_name = req.body.game_name
	var game_id = req.body.game_id ? req.body.game_id : null
	var type_id = req.body.type_id == 'undefined' ?  null :req.body.type_id
	var zone_id = req.body.zone_id == 'undefined' ?  null : req.body.zone_id
	var area_id = req.body.area_id == 'undefined' ?  null : req.body.area_id
	var account = req.body.account
	var state = req.body.state == 'undefined' ?  null : req.body.state
	Game.findAllGamesAndCount(game_id, type_id,zone_id, area_id, game_name, account, state, function (result) {
		res.send(result)
	})
}

exports.findGameById = function (req, res) {
	var params = url.parse(req.url, true).query;
	Game.findGameById(params.id, function (result) {
		res.send(result)
	})
}

exports.AddGame = function (req, res) {
	var params = url.parse(req.url, true).query;
	Game.AddGame(params.name, params.avatar, params.account, params.password, params.leave, params.weapons, params.rare_figure, params.rare_weapons, params.artifact, params.props, params.introduction, function (result) {
		res.send('success')
	})
}

exports.RemoveGame = function (req, res) {
	var params = url.parse(req.url, true).query;
	Game.DeleteGame(params.id, function (result) {
		res.send('success')
	})
}

exports.updateGameState = function (req, res) {
	var id = req.body.id
	var state = req.body.state
	Game.updateGameStateById(id, state, function (result) {
		res.send('success')
	})
}

exports.buyGame = function (req, res) {
	var code = req.body.code
	if (code == 1) {
		var user_id = req.body.user_id
		var buy_id = req.body.buy_id
	} else {
		var user_id = req.session.user.id
	}
	var name = req.body.name
	var type_id = req.body.type_id
	var area_id = req.body.area_id
	var account = req.body.account
	var password = req.body.password
	var buy_price = req.body.buy_price
	var sell_price = req.body.sell_price
	var sell_remark = req.body.sell_remark
	var buy_remark = req.body.buy_remark
	var level = req.body.level
	var figure = req.body.figure
	var weapons = req.body.weapons
	var rare_figure = req.body.rare_figure
	var rare_weapons = req.body.rare_weapons
	var artifact = req.body.artifact
	var props = req.body.props
	var introduction = req.body.introduction
	var avatar = req.body.avatar
	var imageList = req.body['imageList[]']
	Game.AddGame(area_id, name, avatar, account, password, level, figure, weapons, rare_figure, rare_weapons, artifact, props, introduction, async function (result) {
		if(imageList){
		for (var i = 0; i < imageList.length; i++) {
			await Game.addPictureById(result.dataValues.id, imageList[i], function () {})
		}}
		Sell.addSellGame(result.dataValues.id, sell_price, sell_remark, function (data) {
			Record.addBuyRecord(user_id, result.dataValues.id, buy_price, buy_remark, function () {
				if (code == 1) {
					Buy.removeBuyGame(buy_id, function () {
						res.send('success')
					})
				} else {
					res.send('success')
				}
			})
		})
	})

}
exports.notify = function (req, res) {
	var paysapi_id = req.body.paysapi_id
	var orderid = req.body.orderid
	var price = req.body.price
	var realprice = req.body.realprice
	var user_id = req.body.orderuid
	var server_key = req.body.key
	var token = config.Token
	var stringKey = orderid + user_id + paysapi_id + price + realprice + token;
	var key = getMD5(stringKey)
	var orderFormat =(orderid).split("_");
	var sell_id = orderFormat[0]
	var game_id = orderFormat[1]
	console.log(req.body)
//	if (server_key == key) {
		Sell.findSellGameById(sell_id, function (game) {
			if (game[0]) {
				if (game[0].state == 1) {
					Record.addSellRecord(user_id, game[0].id,paysapi_id,realprice, game[0]['sell.price'], game[0]['sell.remark'], function () {
						Sell.removeSellGame(sell_id, function () {
							Game.updateGameStateById(game[0].id, 3, function () {
								res.send({code:0})
							})
						})
					})
				} else if (game[0].state == 2) {
					res.send('banned')
				} else if (game[0].state == 3) {
					res.send('selled')
				}
			} else {
				res.send('undefined')
			}
		})
//	}else{
//		res.send('error')
//	}
}
exports.sellGame = function (req, res) {
	var user_id = req.session.user.id
	var sell_id = req.body.sell_id
	var istype = req.body.istype
	var uid = config.uid
	var token = config.Token
	var notify_url = config.baseurl + '/api/notify'
	var return_url = config.baseurl + '/paySuccess'
	Sell.findSellGameById(sell_id, function (game) {
		if (game[0]) {
			if (game[0].state == 1) {
				var price = game[0]['sell.price']
				var orderid = sell_id + '_'+game[0].id+'_' + formatDate(game[0]['sell.createdAt'], "yyyy-MM-dd-hh-mm-ss")
				var orderuid = user_id
				var goodsname = game[0].account
				var stringKey = goodsname + istype + notify_url + orderid + orderuid + price + return_url + token + uid;
				var key = getMD5(stringKey)
				var order = {
					uid: uid,
					price: price,
					istype: istype,
					notify_url: notify_url,
					return_url: return_url,
					orderid: orderid,
					orderuid: orderuid,
					key: key,
					goodsname: goodsname
				};
				res.send(order)
			} else if (game[0].state == 2) {
				res.send('banned')
			} else if (game[0].state == 3) {
				res.send('selled')
			}
		} else {
			res.send('undefined')
		}
	})
}



exports.updateGame = function (req, res) {
	var name = req.body.name
	var game_id = req.body.game_id
	var type_id = req.body.type_id
	var area_id = req.body.area_id
	var account = req.body.account
	var password = req.body.password
	var level = req.body.level
	var figure = req.body.figure
	var weapons = req.body.weapons
	var rare_figure = req.body.rare_figure
	var rare_weapons = req.body.rare_weapons
	var artifact = req.body.artifact
	var props = req.body.props
	var introduction = req.body.introduction
	var avatar = req.body.avatar
	var imageList = req.body['imageList[]']
	Game.updateGameById(game_id, area_id, name, avatar, account, password, level, figure, weapons, rare_figure, rare_weapons, artifact, props, introduction, async function (result) {
		
		await Picture.deletePicturesById(game_id, function () {})
		if(imageList){
			for (var i = 0; i < imageList.length; i++) {
				await Game.addPictureById(game_id, imageList[i], function () {})
			}
		}
		res.send('success')
	})

}

exports.findGamePicture = function (req, res) {
	var params = url.parse(req.url, true).query;
	Picture.findPicturesById(params.id, function (result) {
		res.send(result)
	})
}

exports.paySuccess = function (req, res) {
	var user_id = req.session.user.id
	var game_id = req.body.game_id
	var sell_id = req.body.sell_id
	console.log(req.body)
	Sell.findSellGameById(sell_id,function(game){
		if(game[0]){
			Game.findGameById(game_id,function(result){
				result[0].code = 2
				res.send(result)
			})
			
		}else{
			Record.findAllSellRecord(null,game_id,user_id,null,null,null,null,null,function(result){
				if(result[0]){
					res.send(result)
				}else{
					result[0] = {}
					result[0].code = 2
					res.send(result)
				}
			})	
		}
	})
}