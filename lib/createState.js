const getGitRootDir = require('./util/getGitRootDir');
const getConfig = require('./getConfig');

const createState = (config = {}) => {
  let root;

  try {
    root = getGitRootDir();
  } catch (error) {
    throw new Error('Could not find Git root folder.');
  }

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
      ...config,
    },
    root,
  };

  // @todo _switch_ this up
  if (state.config.theme && state.config.theme === 'gitmoji') {
    // eslint-disable-next-line global-require
    const {list, types} = require('./getGitmoji');
    state.config.breakingChangePrefix = '💥️ ';
    state.config.list = list;
    state.config.types = types;
  }

  return state;
};

module.exports = createState;
