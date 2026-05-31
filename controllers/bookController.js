const Book = require('../models/Book');

// GET semua buku
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('ditambahOleh', 'nama email');
    res.json({ 
      message: 'Daftar buku berhasil diambil',
      total: books.length,
      books 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET satu buku
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('ditambahOleh', 'nama');
    if (!book) return res.status(404).json({ message: 'Buku tidak ditemukan' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// POST tambah buku (butuh login)
exports.createBook = async (req, res) => {
  try {
    const { judul, penulis, tahun, genre, deskripsi } = req.body;
    
    const book = await Book.create({
      judul, penulis, tahun, genre, deskripsi,
      ditambahOleh: req.user.id
    });

    res.status(201).json({ message: 'Buku berhasil ditambahkan', book });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// PUT update buku (butuh login)
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!book) return res.status(404).json({ message: 'Buku tidak ditemukan' });
    res.json({ message: 'Buku berhasil diupdate', book });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// DELETE buku (butuh login)
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: 'Buku tidak ditemukan' });
    res.json({ message: 'Buku berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};