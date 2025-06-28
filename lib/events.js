const logger = require('./logger');

const setupEvents = (client) => {
  client.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
      const reason = lastDisconnect?.error?.output?.statusCode;
      logger.warn(`❌ Connection closed. Reason: ${reason}`);
      if (reason !== 401) client.connect(); // auto reconnect
    } else if (connection === 'open') {
      logger.info('✅ Connected to WhatsApp');
    }
  });

  client.ev.on('group-participants.update', async (update) => {
    logger.info(`👥 Group update: ${JSON.stringify(update)}`);
    // You can add welcome/goodbye plugin logic here
  });

  client.ev.on('messages.delete', async (msg) => {
    logger.info(`🗑️ Message deleted:`, msg);
    // Optional: log or recover deleted message
  });

  client.ev.on('calls', (call) => {
    logger.warn(`📞 Call detected. Blocking...`);
    client.sendMessage(call.from, { text: "❌ Calls are not allowed." });
    client.updateBlockStatus(call.from, 'block');
  });
};

module.exports = setupEvents;
