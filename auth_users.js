const express = require('express');
const router = express.Router();

// SAME books (must match genera.js)
let books = {
  "1": { title: "Node Book", author: "John", reviews: {} },
  "2": { title: "Express Guide", author: "Mike", reviews: {} }
};

let users = [];

// Task 6: Register
router.post('/register', (req, res) => {
  const { username, password } = req.body;

  let exists = users.find(u => u.username === username);

  if (exists) {
    return res.status(400).json({ message: "User already exists" });
  }

  users.push({ username, password });

  return res.json({ message: "User registered successfully" });
});

// Task 7: Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  let user = users.find(u => u.username === username && u.password === password);

  if (user) {
    return res.json({ message: "Login successful" });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});

// Task 8: Add/Modify review
router.put('/auth/review/:isbn', (req, res) => {
  const { username, review } = req.body;
  const isbn = req.params.isbn;

  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }

  books[isbn].reviews[username] = review;

  return res.json({ message: "Review added/updated successfully" });
});

// Task 9: Delete review
router.delete('/auth/review/:isbn', (req, res) => {
  const { username } = req.body;
  const isbn = req.params.isbn;

  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (!books[isbn].reviews[username]) {
    return res.status(404).json({ message: "Review not found" });
  }

  delete books[isbn].reviews[username];

  return res.json({ message: "Review deleted successfully" });
});

module.exports = router;