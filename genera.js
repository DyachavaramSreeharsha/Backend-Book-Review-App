const express = require('express');
const router = express.Router();

let books = {
  "1": { title: "Node Book", author: "John", reviews: {} },
  "2": { title: "Express Guide", author: "Mike", reviews: {} }
};

// Task 1: Get all books
router.get('/', (req, res) => {
  res.send(books);
});

// Task 2: Get book by ISBN
router.get('/isbn/:isbn', (req, res) => {
  res.send(books[req.params.isbn]);
});

// Task 3: Get books by author
router.get('/author/:author', (req, res) => {
  let result = {};
  for (let key in books) {
    if (books[key].author === req.params.author) {
      result[key] = books[key];
    }
  }
  res.send(result);
});

// Task 4: Get books by title
router.get('/title/:title', (req, res) => {
  let result = {};
  for (let key in books) {
    if (books[key].title === req.params.title) {
      result[key] = books[key];
    }
  }
  res.send(result);
});

// Task 5: Get book reviews
router.get('/review/:isbn', (req, res) => {
  res.send(books[req.params.isbn].reviews);
});

// Task 10: Async callback
router.get('/asyncbooks', async (req, res) => {
  const getBooks = () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(books), 1000);
    });
  };

  try {
    const data = await getBooks();
    res.send(data);
  } catch {
    res.status(500).send("Error");
  }
});

// Task 11: Promise - search by ISBN
router.get('/promise/isbn/:isbn', (req, res) => {
  const getBookByISBN = (isbn) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (books[isbn]) {
          resolve(books[isbn]);
        } else {
          reject("Book not found");
        }
      }, 1000);
    });
  };

  getBookByISBN(req.params.isbn)
    .then((book) => res.send(book))
    .catch((err) => res.status(404).send(err));
});

// Task 12: Promise - search by author
router.get('/promise/author/:author', (req, res) => {
  const getBooksByAuthor = (author) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let result = {};

        for (let key in books) {
          if (books[key].author === author) {
            result[key] = books[key];
          }
        }

        if (Object.keys(result).length > 0) {
          resolve(result);
        } else {
          reject("No books found");
        }
      }, 1000);
    });
  };

  getBooksByAuthor(req.params.author)
    .then((data) => res.send(data))
    .catch((err) => res.status(404).send(err));
});

// Task 13: Promise - search by title
router.get('/promise/title/:title', (req, res) => {
  const getBooksByTitle = (title) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let result = {};

        for (let key in books) {
          if (books[key].title === title) {
            result[key] = books[key];
          }
        }

        if (Object.keys(result).length > 0) {
          resolve(result);
        } else {
          reject("No books found");
        }
      }, 1000);
    });
  };

  getBooksByTitle(req.params.title)
    .then((data) => res.send(data))
    .catch((err) => res.status(404).send(err));
});

module.exports = router;