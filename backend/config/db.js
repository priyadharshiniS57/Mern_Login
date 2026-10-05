const mongoose = require('mongoose');

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error('👉 Make sure your MongoDB service is running locally, or verify your MONGO_URI in .env');
    // Exit process with failure if DB connection is vital
    process.exit(1);
  }
};

module.exports = connectDB;
