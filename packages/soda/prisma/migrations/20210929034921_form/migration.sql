-- CreateTable
CREATE TABLE "Form" (
    "id" TEXT NOT NULL,
    "data" JSONB NOT NULL DEFAULT E'{}',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);
