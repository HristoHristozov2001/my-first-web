var express = require('express');
var router = express.Router();
const { models } = require('../models');
const { where } = require('sequelize');

router.get('/', async function (req, res) {
    try {
        const computers = await models.Computer.findAll();
        res.render('Computers/tableComputers', { computers: computers });
        console.log('Computers: ', computers);
    } catch (error) {
        res.status(500).send("Error loading computers from the database");
        console.log(error);
    }
});

router.get('/addNew', async (req, res) => {
    res.render('Computers/addComputer');
});

router.get('/edit/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const computer = await models.Computer.findByPk(id);
        if(!computer){
            res.status(400).send('The computer not found');
        }
        else{
            res.render('Computers/editComputer', {computer: computer});
        }
    } catch (error) {
        res.status(error).send('Error loading computer from the database');
    }
});

router.post('/edit/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, processor, ram, storage, gpu } = req.body;

    try {
        const computer = await models.Computer.findByPk(id);
        if(computer){
            await computer.update({
                name: name,
                processor: processor,
                ram: ram,
                storage: storage,
                gpu: gpu
            });
        }
        res.redirect('/computers');
    } catch (error) {
        res.status(500).send('The computer was not found');
    }

});

router.get('/delete/:id', async (req, res) => {
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

router.post('/addNew', async (req, res) => {
    const { name, processor, ram, storage, gpu } = req.body;
    try {
       await models.Computer.create({
            name: name, 
            processor: processor,
            ram: ram,
            storage: storage, 
            gpu: gpu
        });
        res.redirect('/computers');
    } catch (error) {
        res.status(500).send('Error adding computer to the database');
    }
});

module.exports = router;