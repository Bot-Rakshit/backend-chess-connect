const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createUnverifiedUser = async (chesscomId, uniqueCode) => {
  try {
    const unverifiedUser = await prisma.unverifiedUser.create({
      data: { chesscomId, uniqueCode },
    });
    return unverifiedUser;
  } catch (error) {
    throw error;
  }
};

exports.getUnverifiedUserByChesscomId = async (chesscomId) => {
  try {
    const unverifiedUser = await prisma.unverifiedUser.findUnique({
      where: { chesscomId },
    });
    return unverifiedUser;
  } catch (error) {
    throw error;
  }
};

exports.deleteUnverifiedUser = async (id) => {
  try {
    await prisma.unverifiedUser.delete({
      where: { id },
    });
  } catch (error) {
    throw error;
  }
};