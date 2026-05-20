const SwapRequest = require('../models/SwapRequest');
const Skill = require('../models/Skill');

// @desc    Send a swap request
// @route   POST /api/requests
// @access  Private
const createRequest = async (req, res) => {
  try {
    const { skillId, message } = req.body;

    const skill = await Skill.findById(skillId);

    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    if (skill.owner.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'You cannot request your own skill' });
    }

    // Check if a pending request already exists
    const existingRequest = await SwapRequest.findOne({
      skill: skillId,
      requester: req.user._id,
      status: 'pending'
    });

    if (existingRequest) {
      return res.status(400).json({ message: 'You already have a pending request for this skill' });
    }

    const request = new SwapRequest({
      skill: skillId,
      requester: req.user._id,
      provider: skill.owner,
      message,
    });

    const createdRequest = await request.save();
    res.status(201).json(createdRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get requests received by logged-in user
// @route   GET /api/requests/incoming
// @access  Private
const getIncomingRequests = async (req, res) => {
  try {
    const requests = await SwapRequest.find({ provider: req.user._id })
      .populate('skill', 'title')
      .populate('requester', 'name email profilePic')
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get requests sent by logged-in user
// @route   GET /api/requests/outgoing
// @access  Private
const getOutgoingRequests = async (req, res) => {
  try {
    const requests = await SwapRequest.find({ requester: req.user._id })
      .populate('skill', 'title')
      .populate('provider', 'name email profilePic')
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Accept a swap request
// @route   PUT /api/requests/:id/accept
// @access  Private
const acceptRequest = async (req, res) => {
  try {
    const request = await SwapRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    if (request.provider.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to accept this request' });
    }

    request.status = 'accepted';
    const updatedRequest = await request.save();
    res.json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Decline a swap request
// @route   PUT /api/requests/:id/decline
// @access  Private
const declineRequest = async (req, res) => {
  try {
    const request = await SwapRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    if (request.provider.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to decline this request' });
    }

    request.status = 'declined';
    const updatedRequest = await request.save();
    res.json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cancel a sent request
// @route   DELETE /api/requests/:id
// @access  Private
const deleteRequest = async (req, res) => {
  try {
    const request = await SwapRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    if (request.requester.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to cancel this request' });
    }

    await request.deleteOne();
    res.json({ message: 'Request cancelled and deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRequest,
  getIncomingRequests,
  getOutgoingRequests,
  acceptRequest,
  declineRequest,
  deleteRequest,
};
