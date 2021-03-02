# git-cz

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

![image](https://user-images.githubusercontent.com/9773803/49760520-fa6c6f00-fcc4-11e8-84c4-80727f071487.png)

## Install

### Without installation

```shell
npx git-cz
# or
npx git-cz -e
```

### Install globally standalone

```shell
npm install -g git-cz
git-cz
# or
git-cz -e
```

### Install locally with Commitizen

```shell
npm install -g commitizen
npm install --save-dev git-cz
```

`package.json`:

```json
{
  "config": {
    "commitizen": {
      "path": "git-cz"
    }
  }
}
```

run:

```shell
git cz
```

### Install globally with Commitizen

```shell
npm install -g commitizen git-cz
commitizen init git-cz --save-dev --save-exact
```

run:

```shell
git cz
```

## Custom config

You can provide a custom configuration in a `changelog.config.js` file in your repo, or in any parent folder.
git-cz will search for the closest config file.
Below is default config:

```js
module.exports = {
  disableEmoji: false,
  format: '{type}{scope}: {emoji}{subject}',
  list: ['test', 'feat', 'fix', 'chore', 'docs', 'refactor', 'style', 'ci', 'perf'],
  maxMessageLength: 64,
  minMessageLength: 3,
  questions: ['type', 'scope', 'subject', 'body', 'breaking', 'issues', 'lerna'],
  scopes: [],
  theme: 'default',
  types: {
    chore: {
      description: 'Build process or auxiliary tool changes',
      emoji: '🤖',
      value: 'chore',
    },
    ci: {
      description: 'CI related changes',
      emoji: '🎡',
      value: 'ci',
    },
    docs: {
      description: 'Documentation only changes',
      emoji: '✏️',
      value: 'docs',
    },
    feat: {
      description: 'A new feature',
      emoji: '🎸',
      value: 'feat',
    },
    fix: {
      description: 'A bug fix',
      emoji: '🐛',
      value: 'fix',
    },
    perf: {
      description: 'A code change that improves performance',
      emoji: '⚡️',
      value: 'perf',
    },
    refactor: {
      description: 'A code change that neither fixes a bug or adds a feature',
      emoji: '💡',
      value: 'refactor',
    },
    release: {
      description: 'Create a release commit',
      emoji: '🏹',
      value: 'release',
    },
    style: {
      description: 'Markup, white-space, formatting, missing semi-colons...',
      emoji: '💄',
      value: 'style',
    },
    test: {
      description: 'Adding missing tests',
      emoji: '💍',
      value: 'test',
    },
  },
};
```

## Non-interactive mode

Using `--non-interactive` flag you can run `git-cz` non-interactive mode.

For example:

```bash
git-cz --non-interactive --type=feat --subject="add onClick prop to component"
```

CLI parameters:

- `--type`
- `--subject`
- `--scope`
- `--body`
- `--breaking`
- `--issues`
- `--lerna`

## Disable Emoji

Using `--disable-emoji` flag will disable emoji.

For example:

```bash
git-cz --disable-emoji
```

## Commit message format

- A commit message consists of a **header**, **body** and **footer**.
- The header has a **type** and a **subject**:

```bash
<type>[(<scope>)]: <emoji> <subject>
[BLANK LINE]
[body]
[BLANK LINE]
[breaking changes]
[BLANK LINE]
[footer]
```

The **header** is the only mandatory part of the commit message.

The first line (type + subject) is limited to 50 characters **[enforced]**

Any other line should be limited to 72 character **[automatic wrapping]**

This allows the message to be easier to read on GitHub as well as in various git tools.

### Format

By default the subject format is: `{type}{scope}: {emoji}{subject}`

```bash
--format "{type}{scope}: {emoji}{subject}"
```

```json
{
  "format": "{type}{scope}: {subject}"
}
```

You can configure your own using the following fields:

- `{emoji}`
- `{scope}`
- `{subject}`
- `{type}`

These are the _only_ fields that will be dynamically replaced by `git-cz`.

These are not `${type}` so in your configuration if you need to pass dynamically values to `format` you can while keeping these separate. Helpful for when adding ` [skip ci]` to `format` conditionally.

📝️ Note: If your configuration file _is_ dynamic and you want to override these change yours at run time to `${type}` 😅️. These fields are only replaced _if_ they exist. Heck, you can have a format of: `format: "static(hard): code value"` if you really want (please do not).

📝️ Note: If you want to keep emojis in the cli and not in your code commits you can do so by not `disable-emoji|disableEmoji` and not putting `{emoji}` in your format:

```bash
--format "{type}{scope}: {subject}"
```

Have fun in your console if you can't in your codebase. 🤣️

### Theme

`git-cz` provides two themes out of the box: `default` and `gitmoji`.

Themes are an opt-in feature. If nothing is provided for `theme` it will fallback to `default`.

### Default

No customizations needed. These are the emojis you know and love from `git-cz`

- 🎸️ feat
- 💡 refactor
- etc.

### Gitmoji

A theme for [gitmoji](https://gitmoji.dev/) is available as an **override**.

- ✨️ feat
- ♻️ refactor
- etc.

```bash
--theme gitmoji
```

```json
{
  "theme": "gitmoji"
}
```

You can `extend` this theme by pulling `./dist/gitmoji/index.json` into your `changelog.config.js` and adding, refactoring as you see fit as well.

📝️ Note: `chore` is provided as a `git-cz` fallback for those that enjoy using it. Otherwise all current `git-cz` => `default` have a 1:1 map to `gitmoji`.

📝️ Note: This will override default types along with their emojis.

### Type

Must be one of the following:

- `test` &mdash; Adding missing tests
- `feat` &mdash; A new feature
- `fix` &mdash; A bug fix
- `chore` &mdash; Build process or auxiliary tool changes
- `docs` &mdash; Documentation only changes
- `refactor` &mdash; A code change that neither fixes a bug or adds a feature
- `style` &mdash; Markup, white-space, formatting, missing semi-colons...
- `ci` &mdash; CI related changes
- `perf` &mdash; A code change that improves performance

### Subject

The subject contains succinct description of the change:

- Use the imperative, present tense: "change" not "changed" nor "changes"
- No dot (.) at the end.

### Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

#### Affects [only on [lerna](https://lernajs.io/) environments]

Select the packages the commit affected.

### Breaking Changes

**Breaking Changes** must start with the words `BREAKING CHANGE: `.

### Footer

The footer is the place to reference any tasks related to this commit.

## Why this Fork

```bash
npm i -g git-cz
added 1 package in 0.612s
```

Installs in 0.6s vs 31.1s.

```bash
npm i -g mol-conventional-changelog
added 345 packages in 31.076s
```

## Husky

If you are using `husky@5.x` on your project that has `git-cz` as a local dependency please be cognizant of **locally installed binaries**:

> If you were calling directly locally installed binaries, you need to run them via your package manager:

```sh
npx --no-install git-cz --hook || true
```

```sh
yarn git-cz --hook || true
```

- ref: https://typicode.github.io/husky/#/?id=locally-installed-binaries
