const { where } = require('sequelize');
const {models} = require('../models');

async function selectAll() {
    return await models.Books.findAll({
        include: ['author', 'publisher', 'genre']
    });
}

async function selectAuthorsPublishersGenres() {
    const authors = await models.Authors.findAll();
    const publishers = await models.Publishers.findAll();
    const genres = await models.Genres.findAll();

    return { authors, publishers, genres };
}

async function create(bookData) {
    return await models.Books.create(bookData);
}

async function findPk(id) {
    return await models.Books.findByPk(id);
}

async function update (id, bookData) {
    const bookId = await models.Books.findByPk(id);
    if(bookId){
        await bookId.update(bookData); 
        return true;
    }
    return false;
}

async function deleteBook(id) {
    const bookId = models.Books.findByPk(id);
    if (bookId) {
        await models.Books.destroy({
            where: {
                id: id
            }
        });
        return true;
    }
    return false;
}

module.exports = { selectAll, selectAuthorsPublishersGenres, create, findPk, update, deleteBook };
