const config = require('./config');
const logger = require('./logger');

const handleMessage = async (msg, client) => {
  if (!msg || !msg.message || msg.key?.remoteJid === 'status@broadcast') return;

  const body =
    msg.message?.conversation ||
    msg.message?.extendedTextMessage?.text ||
    msg.message?.imageMessage?.caption ||
    msg.message?.videoMessage?.caption ||
    '';

  const prefix = config.misc.prefix;
  if (!body.startsWith(prefix)) return;

  const args = body.slice(prefix.length).trim().split(/\s+/);
  const command = args.shift()?.toLowerCase();

  logger.info(`📥 ${msg.pushName || 'User'}: ${body}`);

  // Example basic command
  if (command === 'ping') {
    await client.sendMessage(msg.chat, { text: '🏓 Pong!' }, { quoted: msg });
  }

  if (command === 'uptime') {
    const uptime = process.uptime() * 1000;
    const time = require('./utils').formatUptime(uptime);
    await client.sendMessage(msg.chat, { text: `⏱️ Uptime: ${time}` }, { quoted: msg });
  }
};

module.exports = handleMessage;
