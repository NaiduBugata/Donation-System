const express = require('express');

const router = express.Router();

// Lightweight stubs to satisfy frontend
router.post('/pending-student-events', (req, res) => res.json({ success: true, data: [] }));
router.post('/review-student-event', (req, res) => res.json({ success: true }));
router.post('/dashboard', (req, res) => res.json({ success: true, data: {} }));
router.post('/announcements', (req, res) => res.json({ success: true, data: [] }));
router.post('/events', (req, res) => res.json({ success: true, data: [] }));
router.post('/add-student', (req, res) => res.json({ success: true }));
router.post('/add-students-bulk', (req, res) => res.json({ success: true }));
router.post('/delete-all-students', (req, res) => res.json({ success: true }));

module.exports = router;
