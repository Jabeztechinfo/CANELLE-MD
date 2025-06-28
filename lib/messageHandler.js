const config = require('./config');
const logger = require('./logger');

const commandMap = new Map();
let commandsInitialized = false;

// Register a new command
const registerCommand = (cmd) => {
  if (!cmd?.name || typeof cmd.execute !== 'function') return;

  cmd.permission = cmd.permission || 'public'; // default to public
  commandMap.set(cmd.name.toLowerCase(), cmd);

  if (Array.isArray(cmd.aliases)) {
    for (const alias of cmd.aliases) {
      commandMap.set(alias.toLowerCase(), cmd);
    }
  }

  logger.info(`✅ Command registered: ${cmd.name} [${cmd.permission}]`);
};

// Attach command system once
const attachCommandSystem = (client) => {
  if (commandsInitialized) return;
  client.onCommand = registerCommand;
  client.commands = commandMap;
  commandsInitialized = true;
};

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

    const sender = msg.key.participant || msg.key.remoteJid;
    const isGroup = msg.key.remoteJid.endsWith('@g.us');
    const isOwner = config.core.owner.includes(sender);
    const isSudo = (config.core.sudo || '').includes(sender);

    let isAdmin = false;
    if (cmd.permission === 'admin' && isGroup) {
      try {
        const metadata = await client.groupMetadata(msg.key.remoteJid);
        const admins = metadata.participants.filter(p => p.admin);
        isAdmin = admins.some(p => p.id === sender);
      } catch (e) {
        logger.warn(`⚠️ Could not verify admin status for: ${sender}`);
      }
    }

    if (cmd.permission === 'owner' && !isOwner && !isSudo) {
      return await client.sendMessage(msg.chat, {
        text: '🚫 *Only the bot owner can use this command.*'
      }, { quoted: msg });
    }

    if (cmd.permission === 'admin' && !isAdmin && !isOwner) {
      return await client.sendMessage(msg.chat, {
        text: '⚠️ *This command requires admin rights.*'
      }, { quoted: msg });
    }

    await cmd.execute(msg, {
      args,
      text,
      client,
      sender,
      isOwner,
      isSudo,
      isAdmin,
      isGroup,
      command,
      prefix
    });

  } catch (err) {
    logger.error(`❌ Error in command handler:`, err);
    try {
      await client.sendMessage(msg.key.remoteJid, {
        text: '❌ An error occurred while executing that command.'
      }, { quoted: msg });
    } catch {}
  }
};

module.exports = handleMessage;
