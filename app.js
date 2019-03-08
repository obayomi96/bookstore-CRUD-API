const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const PORT = 3000;

app.use(bodyparser.json());

Genre = require('./models/genre');
Book = require('./models/book');

// Map global promise to get rid of warning
mongoose.Promise = global.Promise;
// Connect to Mongoose
mongoose.connect('mongodb://localhost/bookstore', {
    useNewUrlParser: true
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log('Err', err));
const db = mongoose.connection;

// Home page route
app.get('/', (req, res) => {
    res.send('Please use /api/books or /apis/genres');
});

// Get genre route
app.get('/api/genres', (req, res) => {
    Genre.getGenres((err, genres) => {
        if(err) {
            throw err;
        }
        res.json(genres);
    });
});

// POST - Add genre route
app.post('/api/genres', (req, res) => {
    const genre = req.body;
    Genre.addGenre(genre, (err, genre) => {
        if(err) {
            throw err;
        }
        res.json(genre);
    });
});

// PUT - Update genre route
app.put('/api/genres/:_id', (req, res) => {
    const id = req.params._id;
    const genre = req.body;
    Genre.updateGenre(id, genre, {}, (err, genre) => {
        if(err) {
            throw err;
        }
        res.json(genre);
    });
});

// Delete Genre
app.delete('/api/genres/:_id', (req, res) => {
    const id = req.params._id;
    Genre.removeGenre(id, (err, genre) => {
        if(err) {
            throw err;
        }
        res.json(genre);
    });
});

// Get books route
app.get('/api/books', (req, res) => {
    Book.getBooks((err, books) => {
        if(err) {
            throw err;
        }
        res.json(books);
    });
});

// Get book route
app.get('/api/books/:_id', (req, res) => {
    Book.getBookById(req.params._id, (err, book) => {
        if(err) {
            throw err;
        }
        res.json(book);
    });
});

// POST - Add book
app.post('/api/books', (req, res) => {
    const book = req.body;
    Book.addBook(book, (err, book) => {
        if(err) {
            throw err;
        }
        res.json(book);
    });
});

// PUT - Update book route
app.put('/api/books/:_id', (req, res) => {
    const id = req.params._id;
    const book = req.body;
    Book.updateBook(id, book, {}, (err, book) => {
        if(err) {
            throw err;
        }
        res.json(book);
    });
});

// Delete Book
app.delete('/api/books/:_id', (req, res) => {
    const id = req.params._id;
    Book.removeBook(id, (err, book) => {
        if(err) {
            throw err;
        }
        res.json(book);
    });
});

app.listen(PORT);
console.log(`Running our app on port ${PORT}`);