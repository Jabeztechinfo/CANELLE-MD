const fs = require('fs');
const path = require('path');

module.exports = (client) => {
  client.onCommand({
    name: 'reload',
    description: '♻️ Reload all plugins without restarting',
    usage: '.reload',
    category: 'System',
    permission: 'owner',

    async execute(m, { client }) {
      const pluginDir = path.join(__dirname, '..');

      let reloaded = 0;
      let skipped = 0;

      try {
        const folders = fs.readdirSync(pluginDir).filter(f => fs.statSync(path.join(pluginDir, f)).isDirectory());

        for (const folder of folders) {
          const folderPath = path.join(pluginDir, folder);
          const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.js'));

          for (const file of files) {
            const fullPath = path.join(folderPath, file);
            try {
              delete require.cache[require.resolve(fullPath)];
              const plugin = require(fullPath);
              if (typeof plugin === 'function') {
                plugin(client);
                reloaded++;
              } else {
                skipped++;
              }
            } catch (err) {
              console.error(`❌ Failed to reload ${file}: ${err.message}`);
              skipped++;
            }
          }
        }

        await client.sendMessage(m.chat, {
          text: `✅ Reloaded ${reloaded} plugins\n⚠️ Skipped ${skipped} files`
        }, { quoted: m });

      } catch (err) {
        await client.sendMessage(m.chat, {
          text: `❌ Reload failed: ${err.message}`
        }, { quoted: m });
      }
    }
  });
};
