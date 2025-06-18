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
      secure: false, // process.env.NODE_ENV === 'production',
      sameSite: 'Lax', // 'Lax',
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

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id; // ID user yang akan diupdate
    // Data yang mungkin diupdate
    const { email, password, first_name, last_name, address, interest, favorite } = req.body;

    // Cari user berdasarkan ID
    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    // Objek untuk menampung data yang akan diupdate
    const updateData = {};

    // Tangani upload gambar jika ada file yang diunggah
    // req.file akan tersedia jika middleware upload.single('img_url') digunakan pada route
    if (req.file) {
      updateData.img_url = req.file.path; // Cloudinary secure_url ada di req.file.path
    }

    // Update email jika disediakan dan berbeda dari email saat ini,
    // serta belum digunakan oleh user lain
    if (email && email !== user.email) {
      const existingUserWithEmail = await Users.findOne({ where: { email } });
      // Pastikan email baru tidak dimiliki oleh user lain (selain user yang sedang diupdate)
      if (existingUserWithEmail && existingUserWithEmail.id != userId) {
        return res.status(400).json({ message: 'Email sudah terdaftar oleh user lain' });
      }
      updateData.email = email;
    }

    // Update password jika disediakan (akan di-hash ulang)
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    // Update field lain jika disediakan dalam request body
    if (first_name) updateData.first_name = first_name;
    if (last_name) updateData.last_name = last_name;
    if (address) updateData.address = address;
    if (interest) updateData.interest = interest;
    if (favorite) updateData.favorite = favorite;

    // Lakukan update pada instance user
    await user.update(updateData);

    // Kirim respons dengan data user yang sudah diupdate (kecuali password)
    return res.status(200).json({
      message: 'Profil user berhasil diperbarui',
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        img_url: user.img_url, // Sertakan URL gambar yang baru
        address: user.address,
        interest: user.interest,
        favorite: user.favorite,
        role_id: user.role_id
      }
    });

  } catch (error) {
    console.error("Error updating user:", error); // Log error untuk debugging
    return res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui user', error: error.message });
  }
};

module.exports = {
  register,
  login,
  registerAdmin,
  logout,
  getMe,
  updateUser
};
