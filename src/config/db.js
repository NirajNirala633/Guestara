// config/db.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Connect to the database
export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);  // Exit the process with a failure code
  }
};

export const closeDB = async () => {
  try {
    await prisma.$disconnect();
    console.log("Database disconnected successfully");
  } catch (error) {
    console.error("Error disconnecting from the database:", error);
    process.exit(1);  // Exit the process with a failure code
  }
};

export default prisma;
