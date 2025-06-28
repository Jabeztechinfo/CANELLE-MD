const mongoose = require('mongoose');
const config = require('./config');
const logger = require('./logger');

const connectDB = async () => {
  if (!config.db.mongo) return logger.warn("⚠️ MongoDB URL not set. Skipping DB connection.");
  try {
    await mongoose.connect(config.db.mongo, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('✅ Connected to MongoDB');
  } catch (err) {
    logger.error('❌ MongoDB Connection Error:', err);
  }
};

module.exports = {
  connectDB,
  mongoose,
};
