const KYC = require('../models/KYC');

const uploadKYC = async (req, res) => {
  try {
    const payload = req.body;
    const k = await KYC.create(payload);
    res.status(201).json({ success: true, data: k });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const verifyKYC = async (req, res) => {
  try {
    const { kycId, adminId, approved } = req.body;
    const record = await KYC.findByIdAndUpdate(kycId, { verified: approved, verifiedBy: adminId, verifiedAt: new Date() }, { new: true });
    res.json({ success: true, data: record });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { uploadKYC, verifyKYC };
