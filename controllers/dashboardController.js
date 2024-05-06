const chessComService = require('../services/chessComService');
const userService = require('../services/userService');

exports.getDashboardData = async (req, res, next) => {
  try {
    const totalUsers = await userService.getTotalUsers();
    const averageRating = await userService.getAverageRating();

    // Add more dashboard data as needed
    const dashboardData = {
      totalUsers,
      averageRating,
      // Add more data properties here
    };

    res.json(dashboardData);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    next(error);
  }
};

exports.getUserProfile = async (req, res, next) => {
  try {
    const { chessComId } = req.params;

    const user = await userService.getUserByChessComId(chessComId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const chessComProfile = await chessComService.getPlayerProfile(chessComId);
    const chessComStats = await chessComService.getPlayerStats(chessComId);

    const userProfile = {
      user,
      chessComProfile,
      chessComStats,
    };

    res.json(userProfile);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    next(error);
  }
};

exports.getTitledPlayers = async (req, res, next) => {
  try {
    const { title } = req.params;

    const titledPlayers = await chessComService.getTitledPlayers(title);

    res.json(titledPlayers);
  } catch (error) {
    console.error('Error fetching titled players:', error);
    next(error);
  }
};