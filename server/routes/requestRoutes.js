const express = require('express');
const router = express.Router();
const {
  createRequest,
  getIncomingRequests,
  getOutgoingRequests,
  acceptRequest,
  declineRequest,
  deleteRequest,
} = require('../controllers/requestController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createRequest);
router.get('/incoming', protect, getIncomingRequests);
router.get('/outgoing', protect, getOutgoingRequests);
router.put('/:id/accept', protect, acceptRequest);
router.put('/:id/decline', protect, declineRequest);
router.delete('/:id', protect, deleteRequest);

module.exports = router;
