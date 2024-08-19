var express = require('express');
var router = express.Router();
const pool = require('../db/db');
const computersService = require('../buisnessLayer/computers.service');


router.get('/', async function (req, res) {
    try {
        const computers = await Computer.findAll();
        res.render('Computers/tableComputers', {computers: computers});
        console.log(computers);
    } catch (error) {
        res.status(500).send("Error loading computers from the database");
        console.log(error);
    }
});

router.get('/edit/:id', async function (req, res) {
    const id = parseInt(req.params.id);
    try {
       const computer = await models.Computer.findByPk(id);
        console.log("Computer:\n", computer);
        if (!computer) {
            res.status(400).send('The computer was not found');;
        }
        else{
            res.render('Computers/editComputer', { computer: computer });
        } 
    } catch (error) {
        res.status(error).send('Error loading computer from the database');
    }
});

router.post('/edit/:id', async function(req, res){
    const id = parseInt(req.params.id);
    const {name, processor, ram, storage, gpu} = req.body;

    const computer = req.body;
    computer[id] = parseInt(req.params.id);
    try {
        computersService.update(computer);
        res.redirect('/computers');
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/delete/:id', async function(req, res){
    const id = parseInt(req.params.id);
    try {
        await models.Computer.destroy({
            where: {
                id: id
            }
        });
        res.redirect('/computers');
    } catch (error) {
        res.status(500).send('Error deleting computer from the database');
    }
});

router.get('/addNew',function(req, res){
    res.render('Computers/addComputer');
});

router.post('/addNew', async function(req, res){
    const {name, processor, ram, storage, gpu} = req.body;
    try {
        await models.Computer.create({
            name: name,
            processor: processor,
            ram: ram,
            storage: storage,
            gpu: gpu
        })
        res.redirect('/computers');
    } catch (error) {
        res.status(500).send('Error adding computer to the database');
    }
});

module.exports = router;