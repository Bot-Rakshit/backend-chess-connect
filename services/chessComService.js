const axios = require('axios');
const chessComConfig = require('../config/chesscom');

exports.isValidChessComId = async (chesscomId) => {
  try {
    const response = await axios.get(`${chessComConfig.baseURL}/${chesscomId}`);
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

exports.isUserVerified = async (chesscomId, uniqueCode) => {
  try {
    const response = await axios.get(`${chessComConfig.baseURL}/${chesscomId}`);
    const user = response.data;
    return user.location === uniqueCode;
  } catch (error) {
    throw error;
  }
};