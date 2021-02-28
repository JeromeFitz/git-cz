const fs = require('fs');
const path = require('path');
const gitmoji = require('../lib/themes/gitmoji');

const dataDirectory = path.join(__dirname, '..', 'dist');
const dataFilename = path.resolve(dataDirectory, 'gitmoji.json');

const buildThemes = async () => {
  const data = await JSON.stringify(gitmoji);

  // @todo(callback)
  // eslint-disable-next-line promise/prefer-await-to-callbacks
  fs.writeFile(dataFilename, data, (err) => {
    if (err) {
      throw err;
    }
    // eslint-disable-next-line no-console
    console.log('🧡️  JSON export built for ./dist/gitmoji.json');
  });
};

buildThemes();

module.exports = buildThemes;
