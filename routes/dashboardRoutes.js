const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Get dashboard data
router.get('/', dashboardController.getDashboardData);

// Get user profile
router.get('/user/:chessComId', dashboardController.getUserProfile);

// Get titled players
router.get('/titled/:title', dashboardController.getTitledPlayers);

// Error handling middleware
router.use((err, req, res, next) => {
  console.error('Error in dashboardRoutes:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = router;