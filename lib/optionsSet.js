const optionsSet = (cliOptions) => {
  const options = {};

  if (cliOptions.disableEmoji) {
    options.disableEmoji = cliOptions.disableEmoji;
  }

  if (cliOptions.format) {
    options.format = cliOptions.format;
  }

  if (cliOptions.theme) {
    options.theme = cliOptions.theme;
  } else {
    options.theme = 'default';
  }

  return options;
};

module.exports = optionsSet;
