module.exports = (client) => {
  client.onCommand({
    name: 'restart',
    description: 'Restart the bot (PM2 only)',
    usage: '.restart',
    category: 'System',
    async execute(m, { client }) {
      await client.sendMessage(m.chat, { text: '♻️ Restarting bot...' }, { quoted: m });
      process.exit(1);
    }
  });
};
