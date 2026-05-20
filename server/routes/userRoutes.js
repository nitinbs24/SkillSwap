const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.route('/me').put(protect, updateUserProfile);
router.route('/:id').get(getUserProfile);

module.exports = router;
