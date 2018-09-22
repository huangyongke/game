var Game_area = require('../proxy').Game_area;
var url = require('url');
var Game = require('../proxy').Game;

exports.findarea = function(req, res) {
	var params = url.parse(req.url, true).query;
	Game_area.findAreas(params.game,function(result){
		res.send(result)
	})
}

exports.findAreaById = function(req, res) {
	var params = url.parse(req.url, true).query;
	var area_id = params.area_id;
	var name = params.name;
	Game_area.findAreasById(params.type_id,area_id,name,function(result){
		res.send(result)
	})
}

exports.updateGameArea = function(req, res) {
	var id = req.body.id;
	var category_id = req.body.category_id;
	var name = req.body.name;
	Game_area.findGameAreaUnique(category_id,name,function(remark){
		if(remark){
			res.send("exist")
		}else{
			Game_area.updateGameArea(id,name,function(result){
				res.send('success')
			})
			
		}
	})
	
}

exports.addGameArea = function(req, res) {
	var category_id = req.body.id
	var name = req.body.name;
	Game_area.findGameAreaUnique(category_id,name,function(remark){
		if(remark){
			res.send("exist")
		}else{
			Game_area.addGameArea(category_id,name,function(result){
				res.send('success')
			})
			
		}
	})
	
}

exports.deleteGameArea = function(req, res) {
	var id = req.body.id;
	Game.findGameByArea(id,function(games){
		if(games.length>0){
			res.send("exist")
		}else{
			Game_area.deleteGameArea(id,function(result){
				res.send("success")
			})
		}
	})
	
}