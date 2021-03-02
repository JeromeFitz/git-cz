/* eslint-disable global-require, operator-linebreak */
const getGitRootDir = require('./util/getGitRootDir');
const getConfig = require('./getConfig');

const createState = (config = {}) => {
  let root;

  try {
    root = getGitRootDir();
  } catch (error) {
    throw new Error('Could not find Git root folder.');
  }

  // @note any overrides should override the theme as base
  const configOverride =
    Boolean(config) && config.theme === 'gitmoji'
      ? require('./themes/gitmoji')
      : config;

  const state = {
    answers: {
      body: '',
      breaking: '',
      issues: '',
      lerna: '',
      scope: '',
      subject: '',
      type: '',
    },
    config: {
      ...getConfig(root),
      ...configOverride,
    },
    root,
  };

  return state;
};

module.exports = createState;
