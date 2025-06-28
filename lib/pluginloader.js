const fs = require('fs');
const path = require('path');
const logger = require('./logger');

const loadPlugins = (client) => {
  const pluginsPath = path.join(__dirname, '..', 'plugins');
  if (!fs.existsSync(pluginsPath)) {
    logger.warn('⚠️ No plugins folder found.');
    return;
  }

  const pluginFiles = fs.readdirSync(pluginsPath).filter(file => file.endsWith('.js'));

  pluginFiles.forEach(file => {
    try {
      const filePath = path.join(pluginsPath, file);
      delete require.cache[require.resolve(filePath)];
      const plugin = require(filePath);
      if (typeof plugin === 'function') {
        plugin(client);
        logger.info(`✅ Plugin loaded: ${file}`);
      } else {
        logger.warn(`⚠️ Plugin ${file} does not export a function`);
      }
    } catch (err) {
      logger.error(`❌ Failed to load plugin ${file}:`, err.message);
    }
  });
};

module.exports = loadPlugins;
