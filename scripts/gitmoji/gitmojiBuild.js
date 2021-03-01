const fs = require('fs');
const path = require('path');
const gitmojiRewrite = require('./gitmojiRewrite');

const dataDirectory = path.join(__dirname, '..', '..', 'data', 'gitmoji');
const dataFilename = path.resolve(dataDirectory, 'index.json');

const gitmojiBuild = async () => {
  // eslint-disable-next-line global-require

  const data = await JSON.stringify(gitmojiRewrite);

  // @todo(callback)
  // eslint-disable-next-line promise/prefer-await-to-callbacks
  fs.writeFile(dataFilename, data, (err) => {
    if (err) {
      throw err;
    }
    // eslint-disable-next-line no-console
    console.log('💛️  2. gitmojiBuild > index.json');
  });
};

gitmojiBuild();

module.exports = gitmojiBuild;
