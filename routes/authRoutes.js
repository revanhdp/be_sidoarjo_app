const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const upload = require('../middlewares/cloudinaryStorageProfile');

router.post('/register', authController.register);
router.post('/register/admin', authController.registerAdmin);
router.post('/login', authController.login);
router.delete('/logout', authController.logout);
router.get("/me", authController.getMe);
router.put('/users/:id', upload.single('img_url'), authController.updateUser);

module.exports = router;