// server/routes/majors.js
const express = require('express');
const majors = require('./Majors');

const router = express.Router();

// GET /api/majors -> list all majors
router.get('/majors', (req, res) => {
  // You could also return only id + name here if you want
  const brief = majors.map(m => ({
    id: m.id,
    name: m.name,
    description: m.description,
    totalCredits: m.totalCredits,
  }));
  res.json(brief);
});

// GET /api/majors/:id -> get one major + its classes
router.get('/majors/:id', (req, res) => {
  const { id } = req.params;
  const major = majors.find(m => m.id === id);

  if (!major) {
    return res.status(404).json({ error: 'Major not found' });
  }

  res.json(major);
});

module.exports = router;
