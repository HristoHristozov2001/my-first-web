var express = require('express');
var router = express.Router();

let animals = [
    {
        id: 1,
        name: 'Lion',
        species: 'Panthera leo',
        characteristics: {
            age: 8,
            habitat: 'Savannah',
            diet: 'Carnivore',
            weight: '190kg',
            length: '2.5m'
        }
    },
    {
        id: 2,
        name: 'Elephant',
        species: 'Loxodonta africana',
        characteristics: {
            age: 25,
            habitat: 'Savannah',
            diet: 'Herbivore',
            weight: '6000kg',
            length: '6m'
        }
    },
    {
        id: 3,
        name: 'Penguin',
        species: 'Aptenodytes forsteri',
        characteristics: {
            age: 5,
            habitat: 'Antarctica',
            diet: 'Carnivore',
            weight: '30kg',
            length: '1.1m'
        }
    },
    {
        id: 4,
        name: 'Kangaroo',
        species: 'Macropus rufus',
        characteristics: {
            age: 7,
            habitat: 'Grassland',
            diet: 'Herbivore',
            weight: '85kg',
            length: '1.5m'
        }
    }
];

router.get('/', function(req, res){
    res.render('Animals/animalsTable', {animals: animals})
});

router.get('/edit/:id', function(req, res){
    const id = parseInt(req.params.id);
    const animal = animals.find(c => c.id == id)
    console.log(animal);
    if(!animal){
        return res.status(400).send("Animal not found!");
    }
    res.render('Animals/editAnimal', {animal: animal});
});

router.post('/edit/:id', function(req, res){
    const id = parseInt(req.params.id);
    const animal = animals.find(c => c.id == id);
    if(animal){
        animal.name = req.body.name;
        animal.species = req.body.species;
        animal.characteristics.age = req.body.age;
        animal.characteristics.habitat = req.body.habitat;
        animal.characteristics.diet = req.body.diet;
        animal.characteristics.weight = req.body.weight;
        animal.characteristics.length = req.body.length;
        res.redirect('/animals');
    }
    else{
        res.status(400).send("Animal not found!");
    }
});

router.get('/delete/:id', function(req, res){
    const id = parseInt(req.params.id);
    animals = animals.filter(c => c.id != id);
    res.redirect('/animals');
});

router.get('/addNew', function(req, res){
    res.render('Animals/addAnimal');
});

router.post('/addNew', function(req, res){
    const newId = animals.length > 0 ? animals[animals.length - 1].id + 1 : 1;
    const newAnimal = {
        id: newId,
        name: req.body.name,
        species: req.body.species,
        characteristics: {
            age: req.body.age,
            habitat: req.body.habitat,
            diet: req.body.diet,
            weight: req.body.weight,
            length: req.body.length
        }
    };
    animals.push(newAnimal);
    res.redirect('/animals');
});

module.exports = router;
