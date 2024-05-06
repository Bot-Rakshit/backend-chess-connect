const authService = require('../services/authService');
const userService = require('../services/userService');
const chessComService = require('../services/chessComService');
const youtubeService = require('../services/youtubeService');

exports.connectChessCom = async (req, res) => {
  try {
    const { chesscomId } = req.body;
    const isValidId = await chessComService.isValidChessComId(chesscomId);
    if (!isValidId) {
      return res.status(400).json({ error: 'Invalid Chess.com ID' });
    }
    const existingUser = await userService.getUserByChesscomId(chesscomId);
    if (existingUser) {
      return res.status(400).json({ error: 'Chess.com account is already connected' });
    }
    const unverifiedUser = await userService.getUnverifiedUserByChesscomId(chesscomId);
    if (unverifiedUser) {
      return res.json({ message: 'Chess.com account is pending verification', uniqueCode: unverifiedUser.uniqueCode });
    }
    const uniqueCode = userService.generateUniqueCode();
    await userService.createUnverifiedUser(chesscomId, uniqueCode);
    res.json({ message: 'Chess.com account connected successfully', uniqueCode });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.verifyChessCom = async (req, res) => {
  try {
    const { chesscomId } = req.params;
    const unverifiedUser = await userService.getUnverifiedUserByChesscomId(chesscomId);
    if (!unverifiedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    const isVerified = await chessComService.isUserVerified(chesscomId, unverifiedUser.uniqueCode);
    if (!isVerified) {
      return res.status(400).json({ error: 'Verification failed' });
    }
    const user = await userService.createUser(chesscomId);
    await userService.deleteUnverifiedUser(unverifiedUser.id);
    const token = authService.generateToken(user);
    res.json({ message: 'Chess.com account verified successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.connectYoutube = async (req, res) => {
  try {
    const { code } = req.query;
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = authService.verifyToken(token);
    const { chesscomId } = decodedToken;
    const { tokens } = await youtubeService.getAccessTokens(code);
    const channelId = await youtubeService.getChannelId(tokens.access_token);
    await userService.updateUserYoutubeChannelId(chesscomId, channelId);
    res.json({ message: 'YouTube account connected successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};