const {execSync} = require('child_process');
const signale = require('signale');
const parseArgs = require('./parseArgs');

const isDryRun = () => {
  const {cliOptions, passThroughParams} = parseArgs();
  if (cliOptions.dryRun) {
    // eslint-disable-next-line no-console
    console.log('Running in dry mode.');
  } else if (
    !passThroughParams['allow-empty'] &&
    !passThroughParams.a &&
    !passThroughParams.amend
  ) {
    try {
      /**
       * @author https://github.com/rodrigograca31
       * @see https://github.com/streamich/git-cz/issues/177
       *
       * Exits with 1 if there are differences and 0 if no differences.
       */
      execSync('git diff HEAD --staged --quiet --exit-code');

      // Executes the following line only if the one above didn't crash (exit code: 0)
      signale.error('No files staged!');

      // eslint-disable-next-line no-process-exit
      process.exit(0);
    } catch (error) {
      // eslint-disable no-empty
    }
  }
};

module.exports = isDryRun;
