var models = require('../models')

const addData = async function () {
    await models.Buy_record.destroy({where:{}});
    await models.Sell_record.destroy({where:{}});
    await models.Picture.destroy({where:{}});
    await models.Sell_record.destroy({where:{}});
    await models.Sell.destroy({where:{}});
    await models.Buy.destroy({where:{}});
    await models.Game.destroy({where:{}});
    await models.Game_area.destroy({where:{}});
    await models.Game_category.destroy({where:{}});
    await models.User.destroy({where:{}});
    var user1 = await models.User.create({
        name: 'hyk',
        password: '123456',
		phone: '15822004840',
		email: 'guo97HBK@outlook.com',
        qq: '1234567886',
        weixin: '12345678',
        admin:true,
	});
    var user2 = await models.User.create({
        name: 'hk',
        password: '123456',
		phone: '15822004840',
		email: 'guo97HBK@outlook.com',
        qq: '1234567886',
        weixin: '12345678',
        admin:false,
    });

    var game_categary1 = await models.Game_category.create({
        name:'cf'
    });

    var game_area1 = await models.Game_area.create({
        area:'广东一区'
    })
    var game_area2 = await models.Game_area.create({
        area:'山东一区'
    })
    var game_area3 = await models.Game_area.create({
        area:'河南一区'
    })

    game_categary1.addGame_area(game_area1)
    game_categary1.addGame_area(game_area2)
    game_categary1.addGame_area(game_area3)
    

    var game1 = await models.Game.create({
        name:'name',
        avatar:'game1.png',
        account:'account',
        password:'password',
        level:23,
        figure:'figure',
        weapons:'weapons',
        rare_figure:'rare_figure',
        rare_weapons:'rare_weapons',
        artifact:'artifact',
        props:'props',
        introduction:'introduction',
        state:1,
    })
    var game2 = await models.Game.create({
        name:'name',
        avatar:'game1.png',
        account:'account',
        password:'password',
        level:34,
        figure:'figure',
        weapons:'weapons',
        rare_figure:'rare_figure',
        rare_weapons:'rare_weapons',
        artifact:'artifact',
        props:'props',
        introduction:'introduction',
        state:1,
    })
    var game3 = await models.Game.create({
        name:'name',
        avatar:'game1.png',
        account:'account',
        password:'password',
        level:54,
        figure:'figure',
        weapons:'weapons',
        rare_figure:'rare_figure',
        rare_weapons:'rare_weapons',
        artifact:'artifact',
        props:'props',
        introduction:'introduction',
        state:1,
    })
    var game4 = await models.Game.create({
        name:'name',
        avatar:'game1.png',
        account:'account',
        password:'password',
        level:56,
        figure:'figure',
        weapons:'weapons',
        rare_figure:'rare_figure',
        rare_weapons:'rare_weapons',
        artifact:'artifact',
        props:'props',
        introduction:'introduction',
        state:1,
    })
    var game5 = await models.Game.create({
        name:'name',
        avatar:'game1.png',
        account:'account',
        password:'password',
        level:67,
        figure:'figure',
        weapons:'weapons',
        rare_figure:'rare_figure',
        rare_weapons:'rare_weapons',
        artifact:'artifact',
        props:'props',
        introduction:'introduction',
        state:1,
    })
    var game6 = await models.Game.create({
        name:'name',
        avatar:'game1.png',
        account:'account',
        password:'password',
        level:23,
        figure:'figure',
        weapons:'weapons',
        rare_figure:'rare_figure',
        rare_weapons:'rare_weapons',
        artifact:'artifact',
        props:'props',
        introduction:'introduction',
        state:1,
    })
    var game7 = await models.Game.create({
        name:'name',
        avatar:'game1.png',
        account:'account',
        password:'password',
        level:56,
        figure:'figure',
        weapons:'weapons',
        rare_figure:'rare_figure',
        rare_weapons:'rare_weapons',
        artifact:'artifact',
        props:'props',
        introduction:'introduction',
        state:1,
    })
    var game8 = await models.Game.create({
        name:'name',
        avatar:'game1.png',
        account:'account',
        password:'password',
        level:12,
        figure:'figure',
        weapons:'weapons',
        rare_figure:'rare_figure',
        rare_weapons:'rare_weapons',
        artifact:'artifact',
        props:'props',
        introduction:'introduction',
        state:1,
    })

    await game_area1.addGame(game1);
    await game_area2.addGame(game2);
    await game_area3.addGame(game3);
    await game_area1.addGame(game4);
    await game_area2.addGame(game5);
    await game_area3.addGame(game6);
    await game_area1.addGame(game7);
    await game_area2.addGame(game8);

    var sell1 = await game8.createSell({
        price:34,
        recommend:1,
        remark:'sdsdd'
    })
    var sell2 = await game7.createSell({
        price:54,
        recommend:2,
        remark:'sdsdd'
    })
    var sell3 = await game6.createSell({
        price:45,
        recommend:1,
        remark:'sdsdd'
    })
    var sell4 = await game5.createSell({
        price:67,
        recommend:1,
        remark:'sdsdd'
    })
    var sell5 = await game4.createSell({
        price:25,
        recommend:2,
        remark:'sdsdd'
    })
    var sell6 = await game3.createSell({
        price:75,
        recommend:1,
        remark:'sdsdd'
    })
    var sell7 = await game2.createSell({
        price:37,
        recommend:2,
        remark:'sdsdd'
    })
    var sell8 = await game1.createSell({
        price:78,
        recommend:2,
        remark:'sdsdd'
    })

    var picture1 = await models.Picture.create({
        image:'game1.png'
    })
    var picture2 = await models.Picture.create({
        image:'game2.jpg'
    })
    var picture3 = await models.Picture.create({
        image:'game1.png'
    })
    var picture4 = await models.Picture.create({
        image:'game2.jpg'
    })
    var picture5 = await models.Picture.create({
        image:'game1.png'
    })
    var picture6 = await models.Picture.create({
        image:'game2.jpg'
    })
    var picture7 = await models.Picture.create({
        image:'game2.jpg'
    })
    var picture8 = await models.Picture.create({
        image:'game1.png'
    })

    var picture9 = await models.Picture.create({
        image:'game1.png'
    })
    var picture10 = await models.Picture.create({
        image:'game2.jpg'
    })
    var picture11 = await models.Picture.create({
        image:'game1.png'
    })

    var picture12 = await models.Picture.create({
        image:'game1.png'
    })
    var picture13 = await models.Picture.create({
        image:'game2.jpg'
    })
    var picture14 = await models.Picture.create({
        image:'game1.png'
    })
    var picture15 = await models.Picture.create({
        image:'game2.jpg'
    })
    var picture16 = await models.Picture.create({
        image:'game1.png'
    })

    await game1.addPicture(picture1)
    await game1.addPicture(picture10)
    await game1.addPicture(picture2)
    await game2.addPicture(picture3)
    await game2.addPicture(picture4)
    await game2.addPicture(picture5)
    await game3.addPicture(picture6)
    await game3.addPicture(picture7)
    await game3.addPicture(picture8)
    await game4.addPicture(picture9)
    await game5.addPicture(picture11)
    await game6.addPicture(picture12)
    await game7.addPicture(picture13)
    await game8.addPicture(picture14)
    await game6.addPicture(picture15)
    await game7.addPicture(picture16)

    // var sell_record1 = await game1.createSell_record({
    //     price: 56,
    //     remark:'sdfsdfs'
    // })

    // var sell_record2 = await game2.createSell_record({
    //     price: 56,
    //     remark:'sdfsdfs'
    // })

    // var sell_record3 = await game3.createSell_record({
    //     price: 56,
    //     remark:'sdfsdfs'
    // })

    // var sell_record4 = await game4.createSell_record({
    //     price: 56,
    //     remark:'sdfsdfs'
    // })

    // await user1.addSell_record(sell_record1)
    // await user2.addSell_record(sell_record2)
    // await user1.addSell_record(sell_record3)
    // await user2.addSell_record(sell_record4)

    // var buy_record1 = await game5.createBuy_record({
    //     price: 56,
    //     remark:'sdfsdfs'
    // })

    // var buy_record2 = await game6.createBuy_record({
    //     price: 56,
    //     remark:'sdfsdfs'
    // })

    // var buy_record3 = await game7.createBuy_record({
    //     price: 56,
    //     remark:'sdfsdfs'
    // })

    // var buy_record4 = await game8.createBuy_record({
    //     price: 56,
    //     remark:'sdfsdfs'
    // })

    // await user1.addBuy_record(buy_record1)
    // await user2.addBuy_record(buy_record2)
    // await user1.addBuy_record(buy_record3)
    // await user2.addBuy_record(buy_record4)
}
addData()