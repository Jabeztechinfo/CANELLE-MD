const fs = require('fs');
const path = require('path');
const logger = require('./logger');

const loadPlugins = (client) => {
  const pluginDir = path.join(__dirname, '..', 'plugins');
  const files = fs.readdirSync(pluginDir).filter(f => f.endsWith('.js'));

  for (const file of files) {
    try {
      const pluginPath = path.join(pluginDir, file);
      delete require.cache[require.resolve(pluginPath)];
      const plugin = require(pluginPath);
      if (typeof plugin === 'function') plugin(client);
      logger.info(`✅ Loaded plugin: ${file}`);
    } catch (err) {
      logger.error(`❌ Failed to load plugin ${file}:`, err);
    }
  }
};

module.exports = loadPlugins;
