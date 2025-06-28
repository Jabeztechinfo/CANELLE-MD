const config = require('./config');
const logger = require('./logger');

const commandMap = new Map();
let commandsInitialized = false;

// Register a new command
const registerCommand = (cmd) => {
  if (!cmd?.name || typeof cmd.execute !== 'function') return;

  commandMap.set(cmd.name.toLowerCase(), cmd);

  if (Array.isArray(cmd.aliases)) {
    for (const alias of cmd.aliases) {
      commandMap.set(alias.toLowerCase(), cmd);
    }
  }

  logger.info(`✅ Command registered: ${cmd.name}`);
};

// Bind command system once per session
const attachCommandSystem = (client) => {
  if (commandsInitialized) return;
  client.onCommand = registerCommand;
  client.commands = commandMap;
  commandsInitialized = true;
};

// Main handler for messages
const handleMessage = async (msg, client) => {
  try {
    attachCommandSystem(client);

    if (!msg || !msg.message || msg.key?.remoteJid === 'status@broadcast') return;

    const body =
      msg.message?.conversation ||
      msg.message?.extendedTextMessage?.text ||
      msg.message?.imageMessage?.caption ||
      msg.message?.videoMessage?.caption ||
      '';

    const prefix = config.misc.prefix || '.';
    if (!body.startsWith(prefix)) return;

    const args = body.slice(prefix.length).trim().split(/\s+/);
    const command = args.shift().toLowerCase();
    const text = args.join(' ');

    const cmd = commandMap.get(command);
    if (!cmd) return;

    logger.info(`🟢 Command: ${command} | From: ${msg.pushName || 'User'} | Chat: ${msg.key.remoteJid}`);

    await cmd.execute(msg, {
      args,
      text,
      client,
      sender: msg.key.participant || msg.key.remoteJid,
      command,
      prefix
    });

  } catch (err) {
    logger.error(`❌ Error in message handler:`, err);
    try {
      await client.sendMessage(msg.key.remoteJid, {
        text: '❌ An error occurred while executing that command.'
      }, { quoted: msg });
    } catch {}
  }
};

module.exports = handleMessage;
