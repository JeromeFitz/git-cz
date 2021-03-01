const createState = require('./createState');
const runInteractiveQuestions = require('./runInteractiveQuestions');
const formatCommitMessage = require('./formatCommitMessage');
const parseArgs = require('./parseArgs');
const optionsSet = require('./optionsSet');
const isDryRun = require('./isDryRun');

exports.prompter = (cz, commit) => {
  const run = async () => {
    const {cliAnswers, cliOptions} = parseArgs();
    const state = createState(optionsSet(cliOptions));
    isDryRun();

    await runInteractiveQuestions(state, cliAnswers);

    const message = formatCommitMessage(state, cliAnswers);

    return commit(message);
  };

  run();
};
