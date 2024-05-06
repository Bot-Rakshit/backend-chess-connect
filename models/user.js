const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


exports.createUser = async (chesscomId) => {
  try {
    const user = await prisma.user.create({
      data: { chesscomId },
    });
    return user;
  } catch (error) {
    throw error;
  }
};

exports.getUserByChesscomId = async (chesscomId) => {
  try {
    const user = await prisma.user.findUnique({
      where: { chesscomId },
    });
    return user;
  } catch (error) {
    throw error;
  }
};

exports.updateUserYoutubeChannelId = async (chesscomId, channelId) => {
  try {
    const user = await prisma.user.update({
      where: { chesscomId },
      data: { youtubeChannelId: channelId },
    });
    return user;
  } catch (error) {
    throw error;
  }
};

exports.getUserByYoutubeChannelId = async (youtubeChannelId) => {
  try {
    const user = await prisma.user.findUnique({
      where: { youtube_channel_id: youtubeChannelId },
      include: { ratings: true },
    });
    return user;
  } catch (error) {
    throw new Error('Failed to get user by YouTube channel ID');
  }
};

exports.updateUser = async (userId, updateData) => {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });
    return user;
  } catch (error) {
    throw new Error('Failed to update user');
  }
};

exports.updateUserRatings = async (userId, ratings) => {
  try {
    await prisma.rating.upsert({
      where: { userId },
      update: ratings,
      create: {
        ...ratings,
        user: { connect: { id: userId } },
      },
    });
  } catch (error) {
    throw new Error('Failed to update user ratings');
  }
};