const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static frontend
app.use(express.static(path.join(__dirname, 'public')));

// API ROUTES
app.use('/auth', authRoutes);
app.use('/books', bookRoutes);

// HISTORY API FALLBACK
// Semua selain /auth dan /books -> index.html
app.get(/^(?!\/(auth|books)).*/, (req, res) => {
  res.sendFile(
    path.join(__dirname, 'public', 'index.html')
  );
});

// MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Terhubung ke MongoDB');

    app.listen(process.env.PORT || 5000, () => {
      console.log(
        `🚀 Server berjalan di port ${process.env.PORT || 5000}`
      );
    });
  })
  .catch((err) => {
    console.error(
      '❌ Gagal koneksi MongoDB:',
      err.message
    );
  });