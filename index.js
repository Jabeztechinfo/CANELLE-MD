// index.js
const path = require('path');
const bot = require(path.join(__dirname, 'lib', 'smd'));
const { VERSION } = require('./config');
const pino = require('pino');

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: { colorize: true }
  }
});

const start = async () => {
  logger.info(`🚀 Starting Canelle-MD v${VERSION}`);
  
  try {
    await bot.init();

    logger.info('📦 Syncing database...');
    await bot.DATABASE.sync();

    logger.info('🔌 Connecting...');
    await bot.connect();

    logger.info('✅ Canelle is up and running.');
  } catch (error) {
    logger.error('❌ Startup Error:', error);

    // Retry after delay to prevent stack overflow
    logger.info('🔁 Retrying in 5 seconds...');
    setTimeout(start, 5000);
  }
};

// Graceful Shutdown Handler
const gracefulShutdown = async () => {
  logger.warn('🛑 Shutting down gracefully...');
  if (bot && typeof bot.disconnect === 'function') {
    await bot.disconnect(); // If implemented
  }
  process.exit(0);
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

// Start the bot
start();
