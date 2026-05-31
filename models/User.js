const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: [true, 'Nama wajib diisi']
  },
  email: {
    type: String,
    required: [true, 'Email wajib diisi'],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Password wajib diisi'],
    minlength: 6
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);