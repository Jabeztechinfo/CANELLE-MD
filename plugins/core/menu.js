module.exports = (client) => {
  client.onCommand({
    name: 'menu',
    description: '📖 Show command menu',
    usage: '.menu',
    category: 'Core',
    permission: 'public',

    async execute(m, ctx) {
      const { client, isOwner, isAdmin, sender } = ctx;

      const allCommands = [...client.commands.values()];
      const seen = new Set();
      const visibleCommands = [];

      for (const cmd of allCommands) {
        if (seen.has(cmd.name)) continue;
        seen.add(cmd.name);

        const perm = cmd.permission || 'public';

        if (
          perm === 'public' ||
          (perm === 'admin' && isAdmin) ||
          (perm === 'owner' && isOwner)
        ) {
          visibleCommands.push(cmd);
        }
      }

      // Group commands by category
      const groups = {};
      for (const cmd of visibleCommands) {
        const category = (cmd.category || 'Other').toUpperCase();
        if (!groups[category]) groups[category] = [];
        groups[category].push(`• *${ctx.prefix}${cmd.name}* - ${cmd.description}`);
      }

      // Construct menu text
      let menuText = `╭─❖ *${ctx.command.toUpperCase()} MENU* ❖\n│ _Hi @${sender.split('@')[0]}!_\n│ _Here are your available commands:_\n╰───────◇\n\n`;

      for (const [category, cmds] of Object.entries(groups)) {
        menuText += `❖ *${category}*\n${cmds.join('\n')}\n\n`;
      }

      await client.sendMessage(m.chat, {
        text: menuText.trim(),
        mentions: [sender]
      }, { quoted: m });
    }
  });
};
