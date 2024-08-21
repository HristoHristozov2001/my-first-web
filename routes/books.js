const express = require('express');
const router = express.Router();
const { models } = require('../models');
const bookLayer = require('../businessLayer/books.service');
const BookDTO = require('../DTO/dto');

router.get('/', async (req, res) => {
    const books = await bookLayer.findAllBooks();
    res.render('Library/tableBooks', { books: books });
});

router.get('/addBook', async (req, res) => {
    try {
        const { authors, publishers, genres } = await bookLayer.selectAuthorsPublishersGenres();
        res.render('Library/addBook', { authors: authors, publishers: publishers, genres: genres });

    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error loading form.')
    }
});

router.post('/addBook', async (req, res) => {
    const bookData  = new BookDTO(req.body);
    try {
        await bookLayer.create(bookData);
        res.redirect('/books');
    } catch (error) {
        console.error('Error adding author:', error);
        res.status(500).send('Error adding author.');
    }
});

router.get('/edit/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const book = await bookLayer.findPk(id);
        if(book){
            const { authors, publishers, genres } = await bookLayer.selectAuthorsPublishersGenres();
            res.render('Library/editBook', { book: book, authors: authors, publishers: publishers, genres: genres });
        }
    } catch (error) {
        res.status(500).send('An error occurred while fetching the book');
    }
});

router.post('/editBook/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if(isNaN(id)){
            return res.status(400).send('Invalid book ID');
        }
        else {
            const bookData = new BookDTO(req.body);
            const isUpdated = await bookLayer.update(id, bookData);
            if(isUpdated){
                res.redirect('/books');
            }
            else{
                res.status(404).send('Book not found');
            }
        }
    } catch (error) {
        res.status(500).send('An error occurred while updating the book.');
    }
});

router.get('/delete/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        if (isNaN(id)) {
            return res.status(400).send('Invalid book ID');
        }
        else{
            const isDeleted = await bookLayer.deleteBook(id);
            if (isDeleted) {
                res.redirect('/books');
            }
            else{
                res.status(404).send('Book not deleted');
            }
        }
    } catch (error) {
        res.status(404).send('Error deleting the book from DB.');
    }
});
module.exports = router;