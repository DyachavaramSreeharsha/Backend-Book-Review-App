const express = require('express');
let public_users = express.Router();

// ✅ shared users
const users = [];

// ✅ shared books
const books = {
  "1": { title: "Node Book", author: "John", reviews: {} },
  "2": { title: "Express Guide", author: "Mike", reviews: {} }
};

// get all books
public_users.get('/', (req, res) => {
  return res.send(JSON.stringify(books, null, 2));
});

// get by isbn
public_users.get('/isbn/:isbn', (req, res) => {
  return res.send(books[req.params.isbn]);
});

// get by author
public_users.get('/author/:author', (req, res) => {
  const author = req.params.author;
  let result = {};

  for (let key in books) {
    if (books[key].author === author) {
      result[key] = books[key];
    }
  }

  return res.send(result);
});

// get by title
public_users.get('/title/:title', (req, res) => {
  const title = req.params.title;
  let result = {};

  for (let key in books) {
    if (books[key].title === title) {
      result[key] = books[key];
    }
  }

  return res.send(result);
});

// get reviews
public_users.get('/review/:isbn', (req, res) => {
  return res.send(books[req.params.isbn].reviews);
});

// register
public_users.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  let exists = users.find(u => u.username === username);

  if (exists) {
    return res.status(409).json({ message: "User already exists" });
  }

  users.push({ username, password });

  return res.json({ message: "User registered successfully" });
});

// export
module.exports = {
  general: public_users,
  users: users,
  books: books
};