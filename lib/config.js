const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

// Convert comma-separated strings to arrays
const splitEnvList = (envValue) => {
  return envValue ? envValue.split(',').map(s => s.trim()) : [];
};

module.exports = {
  core: {
    owner: splitEnvList(process.env.OWNER_NUMBER || '254103093350'),
    sudo: splitEnvList(process.env.SUDO || '')
  },

  misc: {
    prefix: process.env.PREFIX || '.',
    style: process.env.STYLE || '5',
    timezone: process.env.TZ || process.env.TIME_ZONE || 'Africa/Nairobi',
    flush: process.env.FLUSH === 'true',
    welcome: process.env.WELCOME === 'true',
    goodbye: process.env.GOODBYE === 'true',
    disablePM: process.env.DISABLE_PM === 'true',
    disableGroups: process.env.DISABLE_GROUPS === 'true',
    readMessages: process.env.READ_MESSAGE === 'true',
    readCommands: process.env.READ_COMMAND === 'true',
    readStatus: process.env.AUTO_READ_STATUS === 'true',
    saveStatus: process.env.AUTO_SAVE_STATUS === 'true',
    msgLogLevel: process.env.MSGS_IN_LOG || 'false',
    waPresence: process.env.WAPRESENCE || 'available'
  },

  database: {
    mongodb: process.env.MONGODB_URI || '',
    databaseUrl: process.env.DATABASE_URL || '',
    sessionId: process.env.SESSION_ID || ''
  },

  meta: {
    botName: process.env.BOT_NAME || 'CANELLE-MD',
    ownerName: process.env.OWNER_NAME || 'It\'x Canelle',
    caption: process.env.CAPTION || 'CANELLE-MD',
    version: process.env.VERSION || '1.3.4',
    language: (process.env.THEME || 'CANELLE').toUpperCase(),
    website: process.env.GURL || 'https://whatsapp.com/channel/',
    github: process.env.GITHUB || 'https://github.com/Jabeztechinfo/CANELLE-MD',
    imageThumb: process.env.THUMB_IMAGE || 'https://github.com/Jabeztechinfo/CANELLE-MD/blob/main/lib/assets/canelle.jpg?raw=true'
  },

  keys: {
    openAi: process.env.OPENAI_API_KEY || '',
    elevenLabs: process.env.ELEVENLAB_API_KEY || '',
    removeBg: process.env.REMOVE_BG_KEY || '',
    herokuApi: process.env.HEROKU_API_KEY || '',
    koyebApi: process.env.KOYEB_API || '',
    herokuApp: process.env.HEROKU_APP_NAME || ''
  },

  restrictions: {
    allowJids: splitEnvList(process.env.ALLOW_JID || ''),
    blockJids: splitEnvList(process.env.BLOCK_JID || ''),
    antilink: process.env.ANTILINK_VALUES || 'all'
  },

  statusSave: {
    readFrom: splitEnvList(process.env.READ_STATUS_FROM || ''),
    saveFrom: splitEnvList(process.env.SAVE_STATUS_FROM || '')
  },

  voice: {
    voiceId: process.env.AITTS_ID || '37'
  }
};
