-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Calling" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Calling_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Calling" ("created_at", "date", "description", "id", "priority", "status", "title", "type", "updated_at", "userId") SELECT "created_at", "date", "description", "id", "priority", "status", "title", "type", "updated_at", "userId" FROM "Calling";
DROP TABLE "Calling";
ALTER TABLE "new_Calling" RENAME TO "Calling";
CREATE TABLE "new_UserLogin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "UserLogin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UserLogin" ("created_at", "email", "id", "password", "updated_at", "userId") SELECT "created_at", "email", "id", "password", "updated_at", "userId" FROM "UserLogin";
DROP TABLE "UserLogin";
ALTER TABLE "new_UserLogin" RENAME TO "UserLogin";
CREATE UNIQUE INDEX "UserLogin_email_key" ON "UserLogin"("email");
CREATE UNIQUE INDEX "UserLogin_userId_key" ON "UserLogin"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
