var express = require('express');
var router = express.Router();

let cars = [
    {
        id: 1,
        make: 'Toyota',
        model: 'Corolla',
        year: 2020,
        color: 'Red',
        engine: {
            type: 'Gasoline',
            horsepower: 132,
            transmission: 'Automatic'
        },
        price: 20000
    },
    {
        id: 2,
        make: 'Honda',
        model: 'Civic',
        year: 2019,
        color: 'Blue',
        engine: {
            type: 'Gasoline',
            horsepower: 158,
            transmission: 'Manual'
        },
        price: 22000
    },
    {
        id: 3,
        make: 'Ford',
        model: 'Mustang',
        year: 2021,
        color: 'Black',
        engine: {
            type: 'Gasoline',
            horsepower: 450,
            transmission: 'Automatic'
        },
        price: 35000
    },
    {
        id: 4,
        make: 'Chevrolet',
        model: 'Malibu',
        year: 2018,
        color: 'White',
        engine: {
            type: 'Gasoline',
            horsepower: 160,
            transmission: 'Automatic'
        },
        price: 18000
    },
    {
        id: 5,
        make: 'Tesla',
        model: 'Model 3',
        year: 2021,
        color: 'Silver',
        engine: {
            type: 'Electric',
            horsepower: 283,
            transmission: 'Automatic'
        },
        price: 40000
    }
];

router.get('/', function(req, res){
    res.render('Cars/tableCars', {cars: cars})
});

router.get('/edit/:id', function(req, res){
    const id = parseInt(req.params.id);
    const car = cars.find(c => c.id == id)
    if(!car){
        return res.status(400).send("Car not found!");
    }
    res.render('Cars/editCar', {car: car});
});

router.post('/edit/:id', function(req, res){
    const id = parseInt(req.params.id);
    const car = cars.find(c => c.id == id);
    if(car){
        car.make = req.body.make;
        car.model = req.body.model;
        car.year = req.body.year;
        car.color = req.body.color;
        car.engine.type = req.body.type;
        car.engine.horsepower = req.body.horsepower;
        car.engine.transmission = req.body.transmission;
        car.price = req.body.price;
        res.redirect('/cars');
    }
    else{
        res.status(400).send("Cars not found!");
    }
});

router.get('/delete/:id', function(req, res){
    const id = parseInt(req.params.id);
    cars = cars.filter(c => c.id != id);
    res.redirect('/cars');
});

router.get('/addCar', function(req, res){
    res.render('Cars/addCar');
});

router.post('/addCar', function(req, res){
    const newId = cars.length > 0 ? cars[cars.length - 1].id + 1 : 1;
    const newCar= {
        id: newId,
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        color: req.body.color,
        engine: {
            type: req.body.type,
            horsepower: req.body.horsepower,
            transmission: req.body.transmission
        },
        price: req.body.price
    };
    cars.push(newCar);
    res.redirect('/cars');
});

module.exports = router;