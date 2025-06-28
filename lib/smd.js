const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const pino = require('pino');
const handleMessage = require('./messageHandler');
const setupEvents = require('./events');
const { connectDB } = require('./database');
const loadPlugins = require('./pluginLoader');
const logger = require('./logger');

const init = async () => {
  await connectDB();
};

const connect = async () => {
  const { state, saveCreds } = await useMultiFileAuthState('session');
  const client = makeWASocket({
    auth: state,
    printQRInTerminal: true,
    logger: pino({ level: 'silent' }),
    browser: ['Canelle-MD', 'Chrome', '1.0.0'],
  });

  client.ev.on('creds.update', saveCreds);
  client.ev.on('messages.upsert', async ({ messages }) => {
    const m = messages[0];
    if (!m.message) return;
    await handleMessage(m, client);
  });

  setupEvents(client);
  loadPlugins(client);

  logger.info("✅ Bot is connected and running");
};

module.exports = {
  init,
  connect,
  logger,
  DATABASE: require('./database'),
};
