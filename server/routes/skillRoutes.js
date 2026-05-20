const express = require('express');
const router = express.Router();
const {
  getSkills,
  getSkillById,
  getUserSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} = require('../controllers/skillController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getSkills)
  .post(protect, createSkill);

router.route('/:id')
  .get(getSkillById)
  .put(protect, updateSkill)
  .delete(protect, deleteSkill);

router.route('/user/:userId').get(getUserSkills);

module.exports = router;
