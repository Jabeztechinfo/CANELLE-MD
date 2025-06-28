const mongoose = require('mongoose');
const config = require('./config');
const logger = require('./logger');

const connectDB = async () => {
  if (!config.db.mongo) return logger.warn("⚠️ MongoDB URI not set. Skipping DB connection.");

  try {
    await mongoose.connect(config.db.mongo, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('✅ MongoDB connected.');
  } catch (err) {
    logger.error('❌ MongoDB Connection Failed:', err);
  }
};

module.exports = {
  connectDB,
  mongoose
};
