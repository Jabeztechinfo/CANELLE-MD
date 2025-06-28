module.exports = (client) => {
  client.onCommand({
    name: 'ping',
    description: 'Check if bot is alive.',
    usage: '.ping',
    category: 'Core',
    async execute(m, { client }) {
      await client.sendMessage(m.chat, { text: '🏓 Pong! Bot is online.' }, { quoted: m });
    }
  });
};
