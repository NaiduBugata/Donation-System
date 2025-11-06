const Request = require('../models/Request');
const User = require('../models/User');

// Haversine distance
function haversineDistKm(a, b) {
  const toRad = v => (v * Math.PI) / 180;
  const R = 6371; // km
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const sinDLat = Math.sin(dLat / 2) * Math.sin(dLat / 2);
  const sinDLon = Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon), Math.sqrt(1 - (sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon)));
  return R * c;
}

const geoMatch = async (req, res) => {
  try {
    const { requestId, radiusKm = 10 } = req.body;
    const request = await Request.findById(requestId);
    if (!request || !request.location) return res.json({ success: true, data: { helpers: [], donors: [] } });

    const allUsers = await User.find({ $or: [{ role: 'helper' }, { role: 'donor' }] });
    const center = request.location;
    const helpers = [];
    const donors = [];

    allUsers.forEach(u => {
      if (!u.location) return;
      const dist = haversineDistKm(center, u.location);
      if (dist <= radiusKm) {
        if (u.role === 'helper') helpers.push(u);
        else donors.push(u);
      }
    });

    res.json({ success: true, data: { helpers, donors } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { geoMatch };
 
