const Skill = require('../models/Skill');

// @desc    Get all active skills (with filters)
// @route   GET /api/skills
// @access  Public
const getSkills = async (req, res) => {
  try {
    const { category, level, search } = req.query;
    
    let query = { isActive: true };

    if (category && category !== 'All') {
      query.category = category;
    }
    
    if (level && level !== 'All') {
      query.level = level;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const skills = await Skill.find(query)
      .populate('owner', 'name email profilePic college year')
      .sort({ createdAt: -1 });

    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single skill detail
// @route   GET /api/skills/:id
// @access  Public
const getSkillById = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id)
      .populate('owner', 'name email profilePic college year bio');

    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.json(skill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all skills by a specific user
// @route   GET /api/skills/user/:userId
// @access  Public
const getUserSkills = async (req, res) => {
  try {
    // Only return active skills for public viewing, but if it's the owner themselves, they might want to see all.
    // For simplicity, returning all skills that belong to the user.
    const skills = await Skill.find({ owner: req.params.userId, isActive: true })
      .populate('owner', 'name email profilePic')
      .sort({ createdAt: -1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new skill listing
// @route   POST /api/skills
// @access  Private
const createSkill = async (req, res) => {
  try {
    const { title, description, category, level, tags } = req.body;

    const skill = new Skill({
      title,
      description,
      category,
      level,
      tags: tags ? tags.split(',').map(tag => tag.trim().toLowerCase()) : [],
      owner: req.user._id,
    });

    const createdSkill = await skill.save();
    res.status(201).json(createdSkill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a skill listing
// @route   PUT /api/skills/:id
// @access  Private
const updateSkill = async (req, res) => {
  try {
    const { title, description, category, level, tags } = req.body;

    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    // Check if the user is the owner
    if (skill.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized to update this skill' });
    }

    skill.title = title || skill.title;
    skill.description = description || skill.description;
    skill.category = category || skill.category;
    skill.level = level || skill.level;
    if (tags !== undefined) {
       skill.tags = typeof tags === 'string' ? tags.split(',').map(tag => tag.trim().toLowerCase()) : tags;
    }

    const updatedSkill = await skill.save();
    res.json(updatedSkill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Soft-delete a skill
// @route   DELETE /api/skills/:id
// @access  Private
const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    // Check if the user is the owner
    if (skill.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized to delete this skill' });
    }

    skill.isActive = false;
    await skill.save();
    
    res.json({ message: 'Skill removed (soft delete)' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSkills,
  getSkillById,
  getUserSkills,
  createSkill,
  updateSkill,
  deleteSkill,
};
