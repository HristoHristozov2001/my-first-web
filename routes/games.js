var express = require('express');
var router = express.Router();

var games = [
    {
        id: 1,
        name: 'The Legend of Zelda: Breath of the Wild',
        genre: 'Action-adventure',
        platform: 'Nintendo Switch',
        rating: 'E10+',
        releaseYear: 2017,
        developer: 'Nintendo'
    },
    {
        id: 2,
        name: 'The Witcher 3: Wild Hunt',
        genre: 'Action RPG',
        platform: 'PC, PS4, Xbox One, Nintendo Switch',
        rating: 'M',
        releaseYear: 2015,
        developer: 'CD Projekt Red'
    },
    {
        id: 3,
        name: 'Red Dead Redemption 2',
        genre: 'Action-adventure',
        platform: 'PC, PS4, Xbox One',
        rating: 'M',
        releaseYear: 2018,
        developer: 'Rockstar Games'
    },
    {
        id: 4,
        name: 'Minecraft',
        genre: 'Sandbox, Survival',
        platform: 'PC, PS4, Xbox One, Nintendo Switch, Mobile',
        rating: 'E10+',
        releaseYear: 2011,
        developer: 'Mojang'
    },
    {
        id: 5,
        name: 'Overwatch',
        genre: 'First-person shooter',
        platform: 'PC, PS4, Xbox One',
        rating: 'T',
        releaseYear: 2016,
        developer: 'Blizzard Entertainment'
    }
];

router.get('/', function(req, res){
    res.render('Games/tableGames', {games: games});
});

router.get('/edit/:id',function(req, res){
    const id = parseInt(req.params.id);
    const game = games.find(g => g.id == id);
    if(!game){
        return res.status(400).send("Game not found!");
    }
    res.render('Games/editGame', {game: game});
});

router.post('/edit/:id', function(req, res){
    const id = parseInt(req.params.id);
    const game = games.find(g => g.id == id);
    if(game){
        game.name = req.body.name;
        game.genre = req.body.genre;
        game.platform = req.body.platform;
        game.rating = req.body.rating;
        game.releaseYear = req.body.releaseYear;
        game.developer = req.body.developer;
        res.redirect('/games');
    }
    else{
        res.status(400).send("Game not found!");
    }
});

router.get('/delete/:id', function(req, res){
    const id = parseInt(req.params.id);
    games = games.filter(g => g.id != id);
    res.redirect('/games');
});

router.get('/addGame', function(req, res){
    res.render('Games/addGame');
});

router.post('/addGame', function(req, res){
    const newId = games.length > 0 ? games[games.length - 1].id + 1 : 1;
    const newGame = {
        id: newId,
        name: req.body.name,
        genre: req.body.genre,
        platform: req.body.platform,
        rating: req.body.rating,
        releaseYear: req.body.releaseYear,
        developer: req.body.developer
    }
    games.push(newGame);
    res.redirect('/games');
})

module.exports = router;