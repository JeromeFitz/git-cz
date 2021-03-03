/* eslint-disable global-require, import/no-dynamic-require, operator-linebreak */
const path = require('path');
const fs = require('fs');
const signale = require('signale');
const defaultTheme = require('./themes/default');

const configFiles = ['.git-cz.json', 'changelog.config.js', 'changelog.config.json'];

const findOverrides = (root) => {
  const dir = root || process.cwd();

  for (const file of configFiles) {
    const filename = path.resolve(dir, file);

    if (fs.existsSync(filename) && fs.statSync(filename).isFile()) {
      return require(filename);
    }
  }

  const parent = path.resolve(dir, '..');

  if (parent !== dir) {
    return findOverrides(parent);
  }

  const pkgFilename = path.join(dir, 'package.json');

  if (fs.existsSync(pkgFilename)) {
    try {
      const changelog = require(pkgFilename).config.commitizen.changelog;

      if (changelog) {
        return changelog;
      }
      // eslint-disable-next-line no-empty
    } catch (error) {}
  }

  return {};
};

const getConfig = (root) => {
  const overrides = findOverrides(root);

  if (typeof overrides !== 'object') {
    signale.fatal(new TypeError('Expected changelog config to be an object.'));

    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }

  // @note any overrides should override the theme as base
  const theme =
    Boolean(overrides) && overrides.theme === 'gitmoji'
      ? require('./themes/gitmoji')
      : defaultTheme;

  const config = {
    ...theme,
    ...overrides,
  };

  return config;
};

module.exports = getConfig;
