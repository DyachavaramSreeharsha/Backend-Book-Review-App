const express = require('express');
let router = express.Router();

const { users, books } = require('./genera');

// 🔐 LOGIN
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  let user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // ✅ store session
  req.session.authorization = { username };

  return res.json({ message: "Login successful" });
});


// ✍️ ADD / UPDATE REVIEW
router.put('/auth/review/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  const review = req.body.review;
  const username = req.session.authorization.username;

  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }

  books[isbn].reviews[username] = review;

  return res.json({ message: "Review added/updated successfully" });
});


// ❌ DELETE REVIEW
router.delete('/auth/review/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  const username = req.session.authorization.username;

  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (!books[isbn].reviews[username]) {
    return res.status(404).json({ message: "No review found" });
  }

  delete books[isbn].reviews[username];

  return res.json({ message: "Review deleted successfully" });
});


module.exports.authenticated = router;