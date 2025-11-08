const express = require('express');
const { getUsers, updateProfile, updateUserPassword, deleteUser, getAllCredentials } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getUsers);
router.get('/credentials/all', protect, getAllCredentials);
router.put('/profile', protect, updateProfile);
router.patch('/:id/password', protect, updateUserPassword);
router.delete('/:id', protect, deleteUser);

module.exports = router;
 
