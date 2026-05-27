const express = require('express');
const axios = require('axios');

let books = require("../booksdb.js");
const public_users = express.Router();

// Task 1: Get all books using async callback function
public_users.get('/', async function (req, res) {
  try {
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving books" });
  }
});

// Task 2: Get book details based on ISBN using Promise callback
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;

  return new Promise((resolve, reject) => {
    if (books[isbn]) {
      resolve(books[isbn]);
    } else {
      reject("Book not found");
    }
  })
    .then(book => res.status(200).json(book))
    .catch(error => res.status(404).json({ message: error }));
});

// Task 3: Get book details based on author using async/await
public_users.get('/author/:author', async function (req, res) {
  try {
    const author = req.params.author.toLowerCase();

    const filteredBooks = Object.values(books).filter(book =>
      book.author.toLowerCase() === author
    );

    if (filteredBooks.length > 0) {
      return res.status(200).json(filteredBooks);
    } else {
      return res.status(404).json({ message: "No books found by this author" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving books by author" });
  }
});

// Task 4: Get book details based on title using async/await
public_users.get('/title/:title', async function (req, res) {
  try {
    const title = req.params.title.toLowerCase();

    const filteredBooks = Object.values(books).filter(book =>
      book.title.toLowerCase() === title
    );

    if (filteredBooks.length > 0) {
      return res.status(200).json(filteredBooks);
    } else {
      return res.status(404).json({ message: "No books found with this title" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving books by title" });
  }
});

module.exports.general = public_users;
