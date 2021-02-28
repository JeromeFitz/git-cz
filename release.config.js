const isCI = require('is-ci');
// eslint-disable-next-line global-require, no-unused-expressions
!isCI && require('dotenv').config({path: './.env'});

module.exports = {
  branches: [
    // eslint-disable-next-line object-property-newline
    {name: 'main', prerelease: 'main'},
    {name: 'master'},
    // eslint-disable-next-line object-property-newline
    {name: 'canary', prerelease: 'canary'}
  ],
  extends: [],
  plugins: [
    '@semantic-release/changelog',
    '@semantic-release/npm',
    '@semantic-release/git'
  ]
};
