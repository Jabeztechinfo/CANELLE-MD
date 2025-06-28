const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const pino = require('pino');
const config = require('./config');
const logger = require('./logger');
const { connectDB } = require('./database');
const loadPlugins = require('./pluginLoader');
const handleMessage = require('./messageHandler');
const setupEvents = require('./events');

const init = async () => {
  await connectDB();
};

const connect = async () => {
  const { state, saveCreds } = await useMultiFileAuthState('session');

  const client = makeWASocket({
    auth: state,
    logger: pino({ level: 'silent' }),
    printQRInTerminal: true,
    browser: ['Canelle-MD', 'Chrome', '1.0.0'],
  });

  client.ev.on('creds.update', saveCreds);

  client.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message) return;
    msg.chat = msg.key.remoteJid;
    msg.pushName = msg.pushName || "User";
    await handleMessage(msg, client);
  });

  setupEvents(client);
  loadPlugins(client);

  logger.info("🚀 CANELLE-MD is up and running.");
};

module.exports = {
  init,
  connect,
  logger,
  DATABASE: require('./database'),
};
