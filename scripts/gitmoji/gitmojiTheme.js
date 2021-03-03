const fs = require('fs');
const path = require('path');
const {types} = require('../../data/gitmoji/index.json');
const defaultTheme = require('../../lib/themes/default');

const theme = {
  ...defaultTheme,
  breakingChangePrefix: '💥️ ',
  types,
};

const dataDirectory = path.join(__dirname, '..', '..', 'lib', 'themes');
const dataFilename = path.resolve(dataDirectory, 'gitmoji.js');

const gitmojiTheme = () => {
  // eslint-disable-next-line global-require

  const data = `
  /* eslint-disable max-len, sort-keys */
  module.exports = ${JSON.stringify(theme, null, 4)};
  `;

  // @todo(callback)
  // eslint-disable-next-line promise/prefer-await-to-callbacks
  fs.writeFile(dataFilename, data, (err) => {
    if (err) {
      throw err;
    }
    // eslint-disable-next-line no-console
    console.log('❤️  3. gitmojiTheme > ./lib/themes/gitmoji.js');
  });
};

gitmojiTheme();

module.exports = gitmojiTheme;
