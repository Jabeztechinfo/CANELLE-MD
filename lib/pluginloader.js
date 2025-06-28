const fs = require('fs');
const path = require('path');
const logger = require('./logger');

const pluginsDir = path.join(__dirname, '..', 'plugins');
let loadedFiles = new Set();

const loadPluginFile = (file, client) => {
  try {
    const filePath = path.join(pluginsDir, file);

    delete require.cache[require.resolve(filePath)];
    const plugin = require(filePath);

    if (typeof plugin === 'function') {
      plugin(client);
      logger.info(`🔃 Loaded plugin: ${file}`);
    } else {
      logger.warn(`⚠️ Skipped plugin (invalid export): ${file}`);
    }
  } catch (err) {
    logger.error(`❌ Error in plugin ${file}:`, err.message);
  }
};

const loadPlugins = (client) => {
  if (!fs.existsSync(pluginsDir)) {
    logger.warn('⚠️ plugins/ folder not found');
    return;
  }

  const files = fs.readdirSync(pluginsDir).filter(f => f.endsWith('.js'));
  for (const file of files) {
    loadPluginFile(file, client);
    loadedFiles.add(file);
  }

  // Watch for file changes
  fs.watch(pluginsDir, (event, filename) => {
    if (filename.endsWith('.js')) {
      logger.info(`📝 Plugin file changed: ${filename}`);
      if (loadedFiles.has(filename)) {
        logger.info(`♻️ Reloading: ${filename}`);
      } else {
        logger.info(`➕ New plugin detected: ${filename}`);
        loadedFiles.add(filename);
      }
      loadPluginFile(filename, client);
    }
  });
};

module.exports = loadPlugins;
