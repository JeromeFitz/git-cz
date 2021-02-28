const fs = require('fs');
const path = require('path');
const fetch = require('isomorphic-unfetch');

const gitmojiUrl =
  'https://raw.githubusercontent.com/carloscuesta/gitmoji/master/src/data/gitmojis.json';

const dataDirectory = path.join(__dirname, '..', 'data');
const dataFilename = path.resolve(dataDirectory, 'gitmojis.json');

const fetchGitmoji = async () => {
  const response = await fetch(gitmojiUrl);
  const json = await response.json();
  const data = await JSON.stringify(json, null, 4);

  // @todo(callback)
  // eslint-disable-next-line promise/prefer-await-to-callbacks
  fs.writeFile(dataFilename, data, (err) => {
    if (err) {
      throw err;
    }
    // eslint-disable-next-line no-console
    console.log('💛️  Latest and greatest gitmojis');
  });
};

fetchGitmoji();

module.exports = fetchGitmoji;
