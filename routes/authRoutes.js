const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateUser } = require('../middlewares/authMiddleware');

router.post('/connect-chesscom', authController.connectChessCom);
router.post('/verify-chesscom/:chesscomId', authController.verifyChessCom);
router.get('/connect-youtube', authenticateUser, authController.connectYoutube);

module.exports = router;