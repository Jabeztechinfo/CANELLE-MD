require('dotenv').config();

module.exports = {
  core: {
    owner: ['254103093350'], // Your owner number(s)
    sudo: process.env.SUDO ? process.env.SUDO.split(',') : []
  },

  misc: {
    prefix: process.env.PREFIX || '.'
  },

  settings: {
    botName: process.env.BOT_NAME || 'CANELLE-MD',
    ownerName: process.env.OWNER_NAME || 'It\'x Canelle',
    version: process.env.VERSION || '1.3.4',
    caption: process.env.CAPTION || 'CANELLE-MD'
  }
};
