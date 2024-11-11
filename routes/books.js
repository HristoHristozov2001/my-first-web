const express = require('express');
const router = express.Router();
const { models } = require('../models');
const bookLayer = require('../businessLayer/businesBook');
const BookDTO = require('../DTO/dto');
const { isAdmin, isAuthenticated } = require('../middleware/isAuth');

router.get('/', isAuthenticated, async (req, res) => {
    const books = await bookLayer.selectAll();
    res.render('Library/tableBooks', { books: books });
});

router.get('/addBook', isAdmin, async (req, res) => {
    try {
        const { authors, publishers, genres } = await bookLayer.selectAuthorsPublishersGenres();
        res.render('Library/addBook', { authors: authors, publishers: publishers, genres: genres });

    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error loading form.')
    }
});

router.post('/addBook', isAdmin, async (req, res) => {
    const bookData = new BookDTO(req.body);
    try {
        await bookLayer.create(bookData);
        res.redirect('/books');
    } catch (error) {
        console.error('Error adding author:', error);
        res.status(500).send('Error adding author.');
    }
});

router.get('/edit/:id', isAdmin, async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const book = await bookLayer.findPk(id);
        if (book) {
            const { authors, publishers, genres } = await bookLayer.selectAuthorsPublishersGenres();
            res.render('Library/editBook', { book: book, authors: authors, publishers: publishers, genres: genres });
        }
    } catch (error) {
        res.status(500).send('An error occurred while fetching the book');
    }
});

router.post('/editBook/:id',isAdmin, async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).send('Invalid book ID');
        }
        else {
            const bookData = new BookDTO(req.body);
            const isUpdated = await bookLayer.update(id, bookData);
            if (isUpdated) {
                res.redirect('/books');
            }
            else {
                res.status(404).send('Book not found');
            }
        }
    } catch (error) {
        res.status(500).send('An error occurred while updating the book.');
    }
});

router.get('/delete/:id', isAdmin, async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        if (isNaN(id)) {
            return res.status(400).send('Invalid book ID');
        }
        else {
            const isDeleted = await bookLayer.deleteBook(id);
            if (isDeleted) {
                res.redirect('/books');
            }
            else {
                res.status(404).send('Book not deleted');
            }
        }
    } catch (error) {
        res.status(404).send('Error deleting the book from DB.');
    }
});

router.get('/logOut', isAuthenticated, async(req, res) => {
    await models.People.update({
        formConfirmCode: false
    }, {
        where: {
            id: req.user.id
        }
    });
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success_msg', 'You have logged out successfully.');
        res.redirect('/logIn');
    });
});
module.exports = router;