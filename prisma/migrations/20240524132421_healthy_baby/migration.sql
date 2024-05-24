-- CreateTable
CREATE TABLE "Profile" (
    "username" TEXT NOT NULL PRIMARY KEY DEFAULT '',
    "email" TEXT NOT NULL,
    "caregiver" TEXT,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "activeHomepageComponent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "page" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Child" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gender" TEXT NOT NULL,
    "DOB" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    "headSize" TEXT NOT NULL,
    "profileUsername" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "Child_profileUsername_fkey" FOREIGN KEY ("profileUsername") REFERENCES "Profile" ("username") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "NapHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "time" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "lengthOfTime" TEXT NOT NULL,
    "childId" INTEGER NOT NULL,
    CONSTRAINT "NapHistory_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BottleFeedingHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "time" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "bottleQuantity" TEXT NOT NULL,
    "bottleQuantityLeft" TEXT NOT NULL,
    "childId" INTEGER NOT NULL,
    CONSTRAINT "BottleFeedingHistory_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BreastFeedingHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "time" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "feedingTimeLength" TEXT NOT NULL,
    "childId" INTEGER NOT NULL,
    CONSTRAINT "BreastFeedingHistory_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MealHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "time" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "drinkType" TEXT NOT NULL,
    "foodType" TEXT NOT NULL,
    "childId" INTEGER NOT NULL,
    CONSTRAINT "MealHistory_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DiapersHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "time" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "diaperType" TEXT NOT NULL,
    "consistency" TEXT NOT NULL,
    "childId" INTEGER NOT NULL,
    CONSTRAINT "DiapersHistory_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "IllnessHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "time" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "symptoms" TEXT NOT NULL,
    "medicationType" TEXT NOT NULL,
    "dosage" TEXT NOT NULL,
    "childId" INTEGER NOT NULL,
    CONSTRAINT "IllnessHistory_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_username_key" ON "Profile"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_email_key" ON "Profile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_password_key" ON "Profile"("password");
