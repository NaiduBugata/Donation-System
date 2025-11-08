const express = require('express');
const { getUsers, updateProfile, updateUserPassword, deleteUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getUsers);
router.put('/profile', protect, updateProfile);
router.patch('/:id/password', protect, updateUserPassword);
router.delete('/:id', protect, deleteUser);

module.exports = router;
 
