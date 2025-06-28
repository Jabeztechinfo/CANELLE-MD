const logger = require('./logger');

const setupEvents = (client) => {
  client.ev.on('group-participants.update', async (event) => {
    logger.info(`👥 Group update: ${JSON.stringify(event)}`);
    // You can add welcome/goodbye logic here.
  });

  client.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    logger.info(`🔌 Connection: ${connection}`);
    if (connection === 'close') {
      const reason = lastDisconnect?.error?.output?.statusCode;
      if (reason !== 401) client.connect(); // auto-reconnect if not logged out
    }
  });
};

module.exports = setupEvents;
