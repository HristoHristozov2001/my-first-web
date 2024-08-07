var express = require('express');
var router = express.Router();
const pool = require('../db/db');

router.get('/', async function (req, res) {
    try {
        const [rows, fields] = await pool.query("SELECT * from computers");
        res.render('Computers/tableComputers', {computers: rows});
        console.log(rows);
        console.log(fields);
    } catch (error) {
        res.status(500).send("Error loading computers from the database");
        console.log(error);
    }
});

router.get('/edit/:id', async function (req, res) {
    const id = parseInt(req.params.id);
    try {
        const [row] = await pool.query('SELECT * from computers WHERE id = ?', [id]);
        const computer = row[0];
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
    try {
        await pool.query('UPDATE computers SET name = ?, processor = ?, ram = ?, storage = ?, gpu = ? WHERE id = ?', [name, processor, ram, storage, gpu, id]);
        res.redirect('/computers');
    } catch (error) {
        res.status(500).send('The computer was not found');
    }
});

router.get('/delete/:id', async function(req, res){
    const id = parseInt(req.params.id);
    try {
        await pool.query('DELETE from computers WHERE id = ?', [id]);
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
        await pool.query('INSERT INTO computers (name, processor, ram, storage, gpu) VALUES (?, ?, ?, ?, ?)', [name, processor, ram, storage, gpu]);
        res.redirect('/computers');
    } catch (error) {
        res.status(500).send('Error adding computer to the database');
    }
});

module.exports = router;