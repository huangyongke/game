var Game = require('../models').Game;
var Picture = require('../models').Picture;
var db = require('../models/index').DB;

exports.findPicturesById = function(id,callback){
    Picture.findAll({
        include:[{
            model:Game,
            where:{
                id:id
            },
        }],
        raw:true
    }).then(function(result){
        callback(result)
    });
}

exports.deletePicturesById = function(id,callback){
    Picture.destroy({
        where:{
            gameId:id
        }
    }).then(function(result){
        callback(result)
    });
}
