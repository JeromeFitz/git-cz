/* eslint-disable object-property-newline */
const isCI = require('is-ci');
// eslint-disable-next-line global-require, no-unused-expressions
!isCI && require('dotenv').config({path: './.env'});

module.exports = {
  branches: [
    {name: 'main', prerelease: 'main'},
    {name: 'master'},
    {name: 'canary', prerelease: 'canary'},
  ],
  extends: [],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        parserOpts: {
          noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES', 'BREAKING'],
        },
      },
    ],
    '@semantic-release/release-notes-generator',
    '@semantic-release/npm',
    '@semantic-release/git',
  ],
};
