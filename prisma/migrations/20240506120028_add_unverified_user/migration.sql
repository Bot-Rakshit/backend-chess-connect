-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "chesscomId" TEXT NOT NULL,
    "youtubeChannelId" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnverifiedUser" (
    "id" SERIAL NOT NULL,
    "chesscomId" TEXT NOT NULL,
    "uniqueCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UnverifiedUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChessInfo" (
    "id" SERIAL NOT NULL,
    "blitzRating" INTEGER,
    "bulletRating" INTEGER,
    "rapidRating" INTEGER,
    "puzzleRating" INTEGER,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ChessInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_chesscomId_key" ON "User"("chesscomId");

-- CreateIndex
CREATE UNIQUE INDEX "User_youtubeChannelId_key" ON "User"("youtubeChannelId");

-- CreateIndex
CREATE UNIQUE INDEX "UnverifiedUser_chesscomId_key" ON "UnverifiedUser"("chesscomId");

-- CreateIndex
CREATE UNIQUE INDEX "ChessInfo_userId_key" ON "ChessInfo"("userId");

-- AddForeignKey
ALTER TABLE "ChessInfo" ADD CONSTRAINT "ChessInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
