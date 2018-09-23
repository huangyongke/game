var Game_category = require('../proxy').Game_category;
var War_zone = require('../proxy').War_zone;
var url = require('url');

exports.findGameCategory = function(req, res) {
	var params = url.parse(req.url, true).query;
	var id = params.id;
	var name = params.name;
	Game_category.findGameCategory(id,name,function(result){
		res.send(result)
	})
}

exports.updateGameCategory = function(req, res) {
	var id = req.body.id;
	var name = req.body.name;
	Game_category.findGameCategoryByName(name,function(remark){
		if(remark){
			res.send("exist")
		}else{
			Game_category.updateGameCategory(id,name,function(result){
				res.send('success')
			})
			
		}
	})
	
}

exports.addGameCategory = function(req, res) {
	var name = req.body.name;
	Game_category.findGameCategoryByName(name,function(remark){
		if(remark){
			res.send("exist")
		}else{
			Game_category.addGameCategory(name,function(result){
				res.send('success')
			})
			
		}
	})
	
}

exports.deleteGameCategory = function(req, res) {
	var id = req.body.id;
	War_zone.findzonesById(id,null,null,function(zones){
		if(zones.length>0){
			res.send("exist")
		}else{
			Game_category.deleteGameCategory(id,function(result){
				res.send("success")
			})
		}
	})
	
}