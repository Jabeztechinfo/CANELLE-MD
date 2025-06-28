const axios = require('axios');

module.exports = (client) => {
  client.onCommand({
    name: 'quote',
    description: 'Get a random quote',
    usage: '.quote',
    category: 'Fun',
    async execute(m, { client }) {
      try {
        const res = await axios.get('https://api.quotable.io/random');
        const quote = res.data;
        await client.sendMessage(m.chat, {
          text: `_"${quote.content}"_\n— *${quote.author}*`
        }, { quoted: m });
      } catch (err) {
        await client.sendMessage(m.chat, { text: '❌ Failed to fetch quote.' }, { quoted: m });
      }
    }
  });
};
