const express = require('express');
const router = express.Router();
const { models } = require('../models');
const { where } = require('sequelize');

router.get('/', async (req, res) => {
    const books = await models.Books.findAll({
        include: ['author', 'publisher', 'genre']
    });
    res.render('Library/tableBooks', { books: books });
});

router.get('/addBook', async (req, res) => {
    try {
        const authors = await models.Authors.findAll();
        const publishers = await models.Publishers.findAll();
        const genres = await models.Genres.findAll();
        res.render('Library/addBook', {authors: authors, publishers: publishers, genres: genres});
        
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error loading form.')
    }
});

router.post('/addBook', async (req, res) => {
    const { title, ISBN, authorId, publisherId, publicationYear, genreId } = req.body;
    try {
        models.Books.create({
            title: title,
            ISBN: ISBN,
            publicationYear: publicationYear,
            authorId: authorId,
            publisherId: publisherId,
            genreId: genreId
        });
        res.redirect('/books');
    } catch (error) {
        console.error('Error adding author:', error);
        res.status(500).send('Error adding author.');
    }
});

router.get('/edit/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const book = await models.Books.findByPk(id);
        const authors = await models.Authors.findAll();
        const publishers = await models.Publishers.findAll();
        const genres = await models.Genres.findAll();
        res.render('Library/editBook', {book: book, authors: authors, publishers: publishers, genres: genres });
    } catch (error) {
        res.status(500).send('An error occurred while fetching the book');
    }
});

router.post('/editBook/:id', async (req, res) =>{
    try {
        const id = parseInt(req.params.id);
        const book = await models.Books.findByPk(id);
        if(book){
            await book.update({
                title: req.body.title,
                ISBN: req.body.ISBN,
                authorId: req.body.authorId,
                publisherId: req.body.publisherId,
                publicationYear: req.body.publicationYear,
                genreId: req.body.genreId,            
            });
            res.redirect('/books');
        }
        else{
            res.status(404).send('Book not found');
        }
    } catch (error) {
        res.status(500).send('An error occurred while updating the book.');
    }
});

router.get('/delete/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const book = await models.Books.findByPk(id);
        if(book){
            await book.destroy({
                where: {
                    id: id
                }
            });
            res.redirect('/books');
        }
    } catch (error) {
        res.status(404).send('Error deleting the book from DB.');
    }
});
module.exports = router;