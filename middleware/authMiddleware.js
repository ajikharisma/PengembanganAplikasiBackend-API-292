const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Ambil token dari header
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Akses ditolak. Token tidak ada.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Simpan data user ke request
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token tidak valid atau sudah expired' });
  }
};