const crypto = require('crypto');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.generateUniqueCode = () => {
  return crypto.randomBytes(4).toString('hex');
};

exports.getUserByChesscomId = async (chesscomId) => {
  return await prisma.user.findUnique({
    where: { chesscomId },
  });
};

exports.createUnverifiedUser = async (chesscomId, uniqueCode) => {
  return await prisma.unverifiedUser.create({
    data: { chesscomId, uniqueCode },
  });
};

exports.getUnverifiedUserByChesscomId = async (chesscomId) => {
  return await prisma.unverifiedUser.findUnique({
    where: { chesscomId },
  });
};

exports.deleteUnverifiedUser = async (id) => {
  return await prisma.unverifiedUser.delete({
    where: { id },
  });
};

exports.createUser = async (chesscomId) => {
  return await prisma.user.create({
    data: { chesscomId },
  });
};

exports.updateUserYoutubeChannelId = async (chesscomId, channelId) => {
  return await prisma.user.update({
    where: { chesscomId },
    data: { youtubeChannelId: channelId },
  });
};