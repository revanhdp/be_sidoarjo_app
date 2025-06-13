const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Users } = require('../models');

// Ganti dengan secret key yang aman di environment (.env)
const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_NAME = process.env.COOKIE_NAME || 'access_token';
const JWT_EXPIRES = process.env.JWT_EXPIRES || '1d';

const register = async (req, res) => {
  try {
    const { email, password, first_name, last_name } = req.body;

    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email sudah terdaftar' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Users.create({
      email,
      password: hashedPassword,
      first_name,
      last_name,
      role_id: 1
    });

    res.status(201).json({ message: 'Registrasi berhasil', user });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Email tidak ditemukan' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Password salah' });
    }

    // Buat token
    const token = jwt.sign(
    {
        id: user.id,
        email: user.email,
        role: user.role_id
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES }
    );

    // Simpan token di cookie
    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 1 hari
    });

    res.status(200).json({ message: 'Login berhasil', token,
        user: {
                id: user.id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                role_id: user.role_id
            }
     });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
  }
};

const registerAdmin = async (req, res) => {
  try {
    const { email, password, first_name, last_name } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Users.create({
      email,
      password: hashedPassword,
      first_name,
      last_name,
      role_id: 2 // 2 = admin
    });

    res.status(201).json({ message: 'Admin registered successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Registration error', error });
  }
};


const logout = (req, res) => {
  res.clearCookie(COOKIE_NAME);
  res.status(200).json({ message: 'Logout berhasil' });
};

module.exports = {
  register,
  login,
  registerAdmin,
  logout,
};
