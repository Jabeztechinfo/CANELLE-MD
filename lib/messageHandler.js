const config = require('./config');
const logger = require('./logger');

const handleMessage = async (m, client) => {
  if (!m || !m.message) return;

  try {
    const body = m.body || m.message?.conversation || m.message?.extendedTextMessage?.text || "";
    const prefix = config.prefix;

    if (!body.startsWith(prefix)) return;

    const args = body.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    logger.info(`📩 ${m.pushName}: ${body}`);

    // Example command handler
    if (command === 'ping') {
      return await client.sendMessage(m.chat, { text: "pong 🏓" }, { quoted: m });
    }

    if (command === 'help') {
      return await client.sendMessage(m.chat, { text: "Available: .ping, .help" }, { quoted: m });
    }

  } catch (err) {
    logger.error("⚠️ Error in message handler:", err);
  }
};

module.exports = handleMessage;
