var Game_area = require('../proxy').Game_area;
var url = require('url');
var Game = require('../proxy').Game;
var War_zone = require('../proxy').War_zone;

// exports.findarea = function(req, res) {
// 	var params = url.parse(req.url, true).query;
// 	Game_area.findAreas(params.game,function(result){
// 		res.send(result)
// 	})
// }

exports.findZoneById = function(req, res) {
	var params = url.parse(req.url, true).query;
	var zone_id = params.zone_id;
	var name = params.name;
	War_zone.findzonesById(params.type_id,zone_id,name,function(result){
		res.send(result)
	})
}

exports.updateWarZone = function(req, res) {
	var id = req.body.id;
	var category_id = req.body.category_id;
	var name = req.body.name;
	War_zone.findZoneUnique(category_id,name,function(remark){
		if(remark){
			res.send("exist")
		}else{
			War_zone.updateWarZone(id,name,function(result){
				res.send('success')
			})
			
		}
	})
	
}

exports.addWarZone = function(req, res) {
	var category_id = req.body.id
	var name = req.body.name;
	War_zone.findZoneUnique(category_id,name,function(remark){
		if(remark){
			res.send("exist")
		}else{
			War_zone.addWarZone(category_id,name,function(result){
				res.send('success')
			})
			
		}
	})
	
}

exports.deleteWarZone = function(req, res) {
    var id = req.body.id;
    Game_area.findAreasById(id,null,null,function(areas){
		if(areas.length>0){
			res.send("exist")
		}else{
			War_zone.deleteWarZone(id,function(result){
				res.send("success")
			})
		}
	})
}