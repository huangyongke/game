var express = require('express');
var router = express.Router();
var upload = require('./fileuploads');
var User = require('./api/userapi');
var Buy = require('./api/buyapi');
var Game = require('./api/gameapi');
var War_zone = require('./api/zoneapi');
var Sell = require('./api/sellapi');
var Game_area = require('./api/areaapi');
var Game_category = require('./api/game_category');
var Record = require('./api/recordapi');
var filter = require('./filter');


router.post('/signin',User.singin)
router.post('/registered',User.registered)
router.post('/forgetPassword',User.forgetPassword)
router.get('/getUserInfoById',filter.checkLogin,User.findUserById)
router.post('/updateUserInfo',filter.checkLogin,User.updateUserInfo)
router.post('/modifyPassword',filter.checkLogin,User.modifyPassword)
router.post('/getAllUsers',filter.checkAuth,User.findAllUsers)
router.post('/modifyadmin',filter.checkAuth,User.modifyadmin)
router.get('/getSession',User.findSession)
router.get('/deleteSession',User.deleteSession)

router.post('/addBuyGame',filter.checkLogin,Buy.AddBuyGame)
router.post('/getAllBuyGame',filter.checkAuth,Buy.findAllBuyGame)
router.post('/removeGame',filter.checkAuth,Buy.removeGame)

router.get('/getAllGames',Sell.findAllGames)
router.get('/getRecommendGames',Sell.findRecommendGames)
router.get('/getNewGames',Sell.findNewGames)
router.get('/getSellGameById',Sell.findSellGameById)
router.post('/getAllSellGame',filter.checkAuth,Sell.findAllSellGame)
router.post('/updateGameRecommend',filter.checkAuth,Sell.updateGameRecommend)
router.post('/updateSellGame',filter.checkAuth,Sell.UpdateSellGame)

router.get('/getGamePicture',Game.findGamePicture)
router.post('/notify',Game.notify)
router.post('/updateGameState',filter.checkAuth,Game.updateGameState)
router.post('/buyGame',filter.checkAuth,Game.buyGame)
router.post('/sellGame',filter.checkLogin,Game.sellGame)
router.post('/paySuccess',filter.checkLogin,Game.paySuccess)
router.post('/getAllGamesAndCount',filter.checkAuth,Game.findAllGamesAndCount)
router.post('/updateGame',filter.checkAuth,Game.updateGame)

//router.get('/getarea',Game_area.findarea)
router.get('/getAreaById',Game_area.findAreaById)
router.post('/addGameArea',filter.checkAuth,Game_area.addGameArea)
router.post('/updateGameArea',filter.checkAuth,Game_area.updateGameArea)
router.post('/deleteGameArea',filter.checkAuth,Game_area.deleteGameArea)

router.get('/getZoneById',War_zone.findZoneById)
router.post('/addWarZone',filter.checkAuth,War_zone.addWarZone)
router.post('/updateWarZone',filter.checkAuth,War_zone.updateWarZone)
router.post('/deleteWarZone',filter.checkAuth,War_zone.deleteWarZone)

router.get('/getGameCategory',Game_category.findGameCategory)
router.post('/addGameCategory',filter.checkAuth,Game_category.addGameCategory)
router.post('/deleteGameCategory',filter.checkAuth,Game_category.deleteGameCategory)
router.post('/updateGameCategory',filter.checkAuth,Game_category.updateGameCategory)

router.post('/getSellRecords',filter.checkLogin,Record.findSellRecords)
router.post('/getBuyRecords',filter.checkLogin,Record.findBuyRecords)
router.post('/getAllBuyRecords',filter.checkAuth,Record.findAllBuyRecords)
router.post('/getAllSellRecords',filter.checkAuth,Record.findAllSellRecords)

router.post('/check',function(req,res){
    console.log(req.body)
})
//文件上传服务
router.post('/upload', upload.single('image'), function (req, res, next) {
    if (req.file) {
        res.send(req.file.filename)
    }
});

module.exports = router;