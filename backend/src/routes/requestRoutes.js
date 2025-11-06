const express = require('express');
const { getRequests, createRequest, getRequestsByUser, acceptRequest, uploadRequestProof, completeService, sanctionRequest, getNearbyRequests, approveRequest, rejectRequest } = require('../controllers/requestController');

const router = express.Router();

router.get('/', getRequests);
router.post('/', createRequest);
router.get('/user/:id', getRequestsByUser);
router.post('/accept', acceptRequest);
router.post('/upload-proof', uploadRequestProof);
router.post('/service/complete', completeService);
router.post('/sanction', sanctionRequest);
router.post('/nearby', getNearbyRequests);
router.post('/approve', approveRequest);
router.post('/reject', rejectRequest);

module.exports = router;
