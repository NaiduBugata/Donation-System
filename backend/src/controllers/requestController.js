const Request = require('../models/Request');

const getRequests = async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    res.json({ success: true, data: requests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// helper: find nearby requests given a location and radius
function haversineKm(a, b) {
  const toRad = v => (v * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const sinDLat = Math.sin(dLat / 2) * Math.sin(dLat / 2);
  const sinDLon = Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon), Math.sqrt(1 - (sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon)));
  return R * c;
}

const getNearbyRequests = async (req, res) => {
  try {
    const { location, radiusKm = 10, category } = req.body || {};
    const all = await Request.find({ status: { $in: ['pending', 'approved'] } });
    const nearby = (all || []).filter(r => r.location && haversineKm(location, r.location) <= radiusKm && (!category || category === 'all' || r.category === category));
    res.json({ success: true, data: nearby });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createRequest = async (req, res) => {
  try {
    const payload = req.body;
    const request = await Request.create(payload);
    res.status(201).json({ success: true, data: request });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getRequestsByUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const requests = await Request.find({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, data: requests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const acceptRequest = async (req, res) => {
  try {
    const { requestId, helperId } = req.body;
    const request = await Request.findByIdAndUpdate(requestId, { acceptedBy: helperId, acceptedAt: new Date(), status: 'accepted' }, { new: true });
    if (!request) return res.status(404).json({ success: false, message: 'Request not found' });
    res.json({ success: true, data: request });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const uploadRequestProof = async (req, res) => {
  try {
    const { requestId, proofUrl } = req.body;
    const request = await Request.findById(requestId);
    if (!request) return res.status(404).json({ success: false, message: 'Request not found' });
    request.proofDocs = request.proofDocs || [];
    request.proofDocs.push(proofUrl);
    await request.save();
    res.json({ success: true, data: request });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const completeService = async (req, res) => {
  try {
    const { requestId } = req.body;
    const request = await Request.findByIdAndUpdate(requestId, { completed: true, status: 'completed' }, { new: true });
    if (!request) return res.status(404).json({ success: false, message: 'Request not found' });
    res.json({ success: true, data: request });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const sanctionRequest = async (req, res) => {
  try {
    const { requestId, amount } = req.body;
    const request = await Request.findByIdAndUpdate(requestId, { sanctionedAmount: amount, status: 'sanctioned' }, { new: true });
    if (!request) return res.status(404).json({ success: false, message: 'Request not found' });
    res.json({ success: true, data: request });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const approveRequest = async (req, res) => {
  try {
    const { requestId, adminId } = req.body;
    const request = await Request.findByIdAndUpdate(requestId, { status: 'approved', approvedBy: adminId, approvedAt: new Date() }, { new: true });
    if (!request) return res.status(404).json({ success: false, message: 'Request not found' });
    res.json({ success: true, data: request });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const rejectRequest = async (req, res) => {
  try {
    const { requestId, adminId, reason } = req.body;
    const request = await Request.findByIdAndUpdate(requestId, { status: 'rejected', rejectedBy: adminId, rejectedAt: new Date(), rejectionReason: reason }, { new: true });
    if (!request) return res.status(404).json({ success: false, message: 'Request not found' });
    res.json({ success: true, data: request });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getRequests, createRequest, getRequestsByUser, acceptRequest, uploadRequestProof, completeService, sanctionRequest, getNearbyRequests, approveRequest, rejectRequest };
