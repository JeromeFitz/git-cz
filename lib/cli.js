const {spawn} = require('child_process');
const fs = require('fs');
const {join} = require('path');
const shellescape = require('any-shell-escape');
const signale = require('signale');
const parseArgs = require('./parseArgs');
const createState = require('./createState');
const runInteractiveQuestions = require('./runInteractiveQuestions');
const runNonInteractiveMode = require('./runNonInteractiveMode');
const formatCommitMessage = require('./formatCommitMessage');
const optionsSet = require('./optionsSet');
const isDryRun = require('./isDryRun');
const getGitRootDir = require('./util/getGitRootDir');

// eslint-disable-next-line no-process-env
const executeCommand = (command, env = process.env) => {
  const proc = spawn(command, [], {
    env,
    shell: true,
    stdio: [0, 1, 2],
  });

  proc.on('close', (code) => {
    // eslint-disable-next-line no-process-exit
    process.exit(code);
  });
};

// eslint-disable-next-line complexity
const main = async () => {
  try {
    const {cliAnswers, cliOptions, passThroughParams} = parseArgs();
    const state = createState(optionsSet(cliOptions));
    isDryRun();

    if (cliOptions.nonInteractive) {
      await runNonInteractiveMode(state, cliAnswers);
    } else {
      await runInteractiveQuestions(state, cliAnswers);
    }

    const message = formatCommitMessage(state);

    const appendedArgs = [];

    // eslint-disable-next-line guard-for-in
    for (const key in passThroughParams) {
      const value = passThroughParams[key];

      if (key.length === 1) {
        appendedArgs.push('-' + key);
      } else {
        appendedArgs.push('--' + key);
      }

      if (value !== true) {
        appendedArgs.push(value);
      }
    }

    const commitMsgFile = join(getGitRootDir(), '.git', 'COMMIT_EDITMSG');

    const command = shellescape([
      'git',
      'commit',
      '--file',
      commitMsgFile,
      ...appendedArgs,
    ]);

    if (cliOptions.dryRun) {
      // eslint-disable-next-line no-console
      console.log('Will execute command:');

      // The full path is replaced with a relative path to make the test pass on every machine
      // eslint-disable-next-line no-console
      console.log(command.replace(commitMsgFile, '.git/COMMIT_EDITMSG'));
      // eslint-disable-next-line no-console
      console.log('Message:');
      // eslint-disable-next-line no-console
      console.log(message);
    } else {
      fs.writeFileSync(commitMsgFile, message);

      /**
       * @author https://github.com/oxyii
       * @see https://github.com/streamich/git-cz/issues/79
       */
      if (cliOptions.hook) {
        // eslint-disable-next-line no-process-exit
        process.exit(0);
      }

      executeCommand(command);
    }
  } catch (error) {
    signale.fatal(error);
  }
};

main();
