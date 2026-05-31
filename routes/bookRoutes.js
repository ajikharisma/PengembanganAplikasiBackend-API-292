const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
} = require('../controllers/bookController');

// Public routes (tidak perlu login)
router.get('/', getAllBooks);
router.get('/:id', getBookById);

// Protected routes (harus login & punya token)
router.post('/', auth, createBook);
router.put('/:id', auth, updateBook);
router.delete('/:id', auth, deleteBook);

module.exports = router;