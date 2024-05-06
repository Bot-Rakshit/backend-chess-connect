const userService = require('../services/userService');

exports.getUser = async (req, res) => {
  try {
    const { chesscomId } = req.params;
    const user = await userService.getUserByChesscomId(chesscomId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};