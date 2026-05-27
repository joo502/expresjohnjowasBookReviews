const express = require('express');
let books = require("../booksdb.js");

const public_users = express.Router();

// Get all books
public_users.get('/', function (req, res) {
  return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;

  if (books[isbn]) {
    return res.status(200).json(books[isbn]);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author.toLowerCase();

  const filteredBooks = Object.values(books).filter(book =>
    book.author.toLowerCase() === author
  );

  if (filteredBooks.length > 0) {
    return res.status(200).json(filteredBooks);
  } else {
    return res.status(404).json({ message: "No books found by this author" });
  }
});

// Get book details based on title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title.toLowerCase();

  const filteredBooks = Object.values(books).filter(book =>
    book.title.toLowerCase() === title
  );

  if (filteredBooks.length > 0) {
    return res.status(200).json(filteredBooks);
  } else {
    return res.status(404).json({ message: "No books found with this title" });
  }
});

module.exports.general = public_users;