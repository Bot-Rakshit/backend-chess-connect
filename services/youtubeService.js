// services/youtubeService.js
const { google } = require('googleapis');
const youtubeConfig = require('../config/youtube');

const oauth2Client = new google.auth.OAuth2(
  youtubeConfig.clientId,
  youtubeConfig.clientSecret,
  youtubeConfig.redirectUri
);

