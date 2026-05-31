const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  judul: {
    type: String,
    required: [true, 'Judul buku wajib diisi']
  },
  penulis: {
    type: String,
    required: [true, 'Penulis wajib diisi']
  },
  tahun: {
    type: Number
  },
  genre: {
    type: String
  },
  deskripsi: {
    type: String
  },
  ditambahOleh: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);