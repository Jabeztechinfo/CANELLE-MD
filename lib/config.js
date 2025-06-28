const fs = require('fs-extra');
const path = require('path');

// Load .env if available
if (fs.existsSync('.env')) {
  require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
}

// Utility to normalize booleans
const toBool = (x) => ['true', '1', 'yes'].includes(String(x).toLowerCase());

const config = {
  app: {
    name: process.env.BOT_NAME || 'CANELLE-MD',
    version: process.env.VERSION || '1.3.4',
    caption: process.env.CAPTION || 'CANELLE-MD',
    author: process.env.PACK_AUTHER || 'CANELLE',
    packname: process.env.PACK_NAME || 'CANELLE',
    ownerName: process.env.OWNER_NAME || 'It\'x Canelle',
    owner: (process.env.OWNER_NUMBER || '254103093350').replace(/\s+/g, ''),
    devs: process.env.DEVS || '923184474176',
    menuStyle: process.env.MENU || '',
    github: process.env.GITHUB || 'https://github.com/Jabeztechinfo/CANELLE-MD',
    website: process.env.GURL || 'https://whatsapp.com/channel/',
    email: 'osiemojabez@gmail.com',
    location: 'Nairobi, Kenya',
  },

  server: {
    port: process.env.PORT || 3000,
    appUrl: process.env.APP_URL || '',
    timezone: process.env.TZ || process.env.TIME_ZONE || 'Africa/Nairobi',
  },

  session: {
    sessionId: process.env.SESSION_ID || '',
  },

  db: {
    url: process.env.DATABASE_URL || '',
    mongo: process.env.MONGODB_URI || '',
    isMongoEnabled: !!process.env.MONGODB_URI,
    allowJids: (process.env.ALLOW_JID || '').split(','),
    blockJids: (process.env.BLOCK_JID || '').split(','),
  },

  apis: {
    removeBgKey: process.env.REMOVE_BG_KEY || '',
    openAiKey: process.env.OPENAI_API_KEY || '',
    elevenLabsKey: process.env.ELEVENLAB_API_KEY || '',
    aittsVoiceId: process.env.AITTS_ID || '37',
    koyebApi: process.env.KOYEB_API || '',
    heroku: {
      apiKey: process.env.HEROKU_API_KEY || '',
      appName: process.env.HEROKU_APP_NAME || '',
    },
  },

  flags: {
    workType: process.env.WORKTYPE || process.env.MODE || 'private',
    style: process.env.STYLE || '5',
    flush: toBool(process.env.FLUSH),
    welcome: toBool(process.env.WELCOME),
    goodbye: toBool(process.env.GOODBYE),
    disablePm: toBool(process.env.DISABLE_PM),
    disableGroups: toBool(process.env.DISABLE_GROUPS),
    msgsInLog: process.env.MSGS_IN_LOG || 'false',
    readCmds: toBool(process.env.READ_COMMAND),
    readMessage: toBool(process.env.READ_MESSAGE),
    warnCount: parseInt(process.env.WARN_COUNT) || 3,
    waPresence: process.env.WAPRESENCE || 'null',
    alwaysOnline: process.env.WAPRESENCE || 'unavailable',
  },

  autoStatus: {
    read: toBool(process.env.AUTO_READ_STATUS),
    save: toBool(process.env.AUTO_SAVE_STATUS),
    readFrom: (process.env.READ_STATUS_FROM || '').split(','),
    saveFrom: (process.env.SAVE_STATUS_FROM || '').split(','),
  },

  media: {
    thumbImage: process.env.THUMB_IMAGE || process.env.IMAGE || 'https://github.com/Jabeztechinfo/CANELLE-MD/blob/main/lib/assets/canelle.jpg?raw=true',
    userImages: process.env.USER_IMAGES || 'text',
  },

  misc: {
    errorChat: process.env.ERROR_CHAT || '',
    prefix: process.env.PREFIX || '.',
    branch: process.env.BRANCH || 'main',
    language: (process.env.THEME || 'CANELLE').toUpperCase(),
    antilinkValues: process.env.ANTILINK_VALUES || 'all',
    readMessageFrom: (process.env.READ_MESSAGE_FROM || '').split(','),
  }
};

// Optional: Hot reload config in development
if (process.env.NODE_ENV !== 'production') {
  const file = require.resolve(__filename);
  fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`♻️  Reloading config: ${__filename}`);
    delete require.cache[file];
    require(file);
  });
}

module.exports = config;
