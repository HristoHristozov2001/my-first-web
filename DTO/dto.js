class BookDTO {
    constructor({title, ISBN, authorId, publisherId, publicationYear, genreId}) {
        this.title = title;
        this.ISBN = ISBN;
        this.authorId = authorId;
        this.publisherId = publisherId;
        this.publicationYear = publicationYear;
        this.genreId = genreId;
    }
}

module.exports = BookDTO;