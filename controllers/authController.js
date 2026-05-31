const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER
exports.register = async (req, res) => {
  try {
    const { nama, email, password } = req.body;

    // Cek apakah email sudah ada
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: 'Email sudah terdaftar' });
    }

    // Enkripsi password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Simpan user baru
    const user = await User.create({
      nama,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: 'Registrasi berhasil',
      user: { id: user._id, nama: user.nama, email: user.email }
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Cari user berdasarkan email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email tidak ditemukan' });
    }

    // Cocokkan password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Password salah' });
    }

    // Buat JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login berhasil',
      token,
      user: { id: user._id, nama: user.nama, email: user.email }
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};