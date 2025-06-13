const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Users } = require('../models');

// Konfigurasi environment
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';
const COOKIE_NAME = process.env.COOKIE_NAME || 'access_token';
const JWT_EXPIRES = process.env.JWT_EXPIRES || '1d';

// Register user biasa
const register = async (req, res) => {
  try {
    const { email, password, first_name, last_name } = req.body;

    // Validasi input
    if (!email || !password || !first_name) {
      return res.status(400).json({ message: 'Email, password, dan first name wajib diisi' });
    }

    // Cek user sudah ada
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email sudah terdaftar' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user
    const user = await Users.create({
      email,
      password: hashedPassword,
      first_name,
      last_name,
      role_id: 1 // default user
    });

    return res.status(201).json({
      message: 'Registrasi berhasil',
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role_id: user.role_id
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
  }
};

const getMe = async (req, res) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await Users.findByPk(decoded.id, {
      attributes: ['id', 'first_name', 'email', 'role_id']
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Invalid token", error: err.message });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validasi input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email dan password wajib diisi' });
    }

    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Email tidak ditemukan' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Password salah' });
    }

    // Buat JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role_id
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES }
    );

    // Set cookie
    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      maxAge: 24 * 60 * 60 * 1000 // 1 hari
    });

    return res.status(200).json({
      message: 'Login berhasil',
      token,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role_id: user.role_id
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
  }
};

// Register admin
const registerAdmin = async (req, res) => {
  try {
    const { email, password, first_name, last_name } = req.body;

    if (!email || !password || !first_name || !last_name) {
      return res.status(400).json({ message: 'Semua field harus diisi' });
    }

    const existingAdmin = await Users.findOne({ where: { email } });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Email sudah terdaftar' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Users.create({
      email,
      password: hashedPassword,
      first_name,
      last_name,
      role_id: 2 // admin
    });

    return res.status(201).json({
      message: 'Admin berhasil didaftarkan',
      user: {
        id: admin.id,
        email: admin.email,
        first_name: admin.first_name,
        last_name: admin.last_name,
        role_id: admin.role_id
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
  }
};

// Logout user
const logout = (req, res) => {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax'
  });
  return res.status(200).json({ message: 'Logout berhasil' });
};

module.exports = {
  register,
  login,
  registerAdmin,
  logout,
  getMe
};
