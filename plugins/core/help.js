module.exports = (client) => {
  client.onCommand({
    name: 'help',
    description: 'List all commands',
    usage: '.help',
    category: 'Core',
    async execute(m, { client }) {
      const commands = [...client.commands?.values() || []];
      const grouped = commands.reduce((acc, cmd) => {
        const cat = cmd.category || 'General';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(`• *${cmd.name}* - ${cmd.description}`);
        return acc;
      }, {});
      
      let msg = '📚 *Help Menu*\n\n';
      for (const [cat, cmds] of Object.entries(grouped)) {
        msg += `*${cat}*\n${cmds.join('\n')}\n\n`;
      }

      await client.sendMessage(m.chat, { text: msg.trim() }, { quoted: m });
    }
  });
};
