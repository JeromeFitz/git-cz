/* eslint-disable object-property-newline */
// eslint-disable-next-line id-match
const _find = require('lodash/find');
const items = require('../../data/gitmoji/init.json').gitmojis;

// @note pseudo-map to conventional-commits
const rewrites = [
  {from: 'art', to: 'style'},
  {from: 'zap', to: 'perf'},
  {from: 'fire', to: 'prune'},
  {from: 'bug', to: 'fix'},
  {from: 'ambulance', to: 'quickfix'},
  {from: 'sparkles', to: 'feat'},
  {from: 'memo', to: 'docs'},
  {from: 'rocket', to: 'deploy'},
  {from: 'lipstick', to: 'ui'},
  {from: 'tada', to: 'init'},
  {from: 'white-check-mark', to: 'test'},
  {from: 'lock', to: 'security'},
  {from: 'bookmark', to: 'release'},
  {from: 'rotating-light', to: 'lint'},
  {from: 'construction', to: 'wip'},
  {from: 'green-heart', to: 'fix-ci'},
  {from: 'arrow-down', to: 'downgrade'},
  {from: 'arrow-up', to: 'upgrade'},
  {from: 'pushpin', to: 'pushpin'},
  {from: 'construction-worker', to: 'ci'},
  {from: 'chart-with-upwards-trend', to: 'analytics'},
  {from: 'recycle', to: 'refactor'},
  {from: 'heavy-plus-sign', to: 'dep-add'},
  {from: 'heavy-minus-sign', to: 'dep-rm'},
  {from: 'wrench', to: 'config'},
  {from: 'hammer', to: 'build'},
  {from: 'globe-with-meridians', to: 'i18n'},
  {from: 'pencil2', to: 'typo'},
  {from: 'poop', to: 'poo'},
  {from: 'rewind', to: 'revert'},
  {from: 'twisted-rightwards-arrows', to: 'merge'},
  {from: 'package', to: 'dep-up'},
  {from: 'alien', to: 'compat'},
  {from: 'truck', to: 'mv'},
  {from: 'page-facing-up', to: 'license'},
  {from: 'boom', to: 'breaking'},
  {from: 'bento', to: 'assets'},
  {from: 'wheelchair', to: 'access'},
  {from: 'bulb', to: 'docs-code'},
  {from: 'beers', to: 'beer'},
  {from: 'speech-balloon', to: 'texts'},
  {from: 'card-file-box', to: 'db'},
  {from: 'loud-sound', to: 'log-add'},
  {from: 'mute', to: 'log-rm'},
  {from: 'busts-in-silhouette', to: 'contrib-add'},
  {from: 'children-crossing', to: 'ux'},
  {from: 'building-construction', to: 'arch'},
  {from: 'iphone', to: 'iphone'},
  {from: 'clown-face', to: 'mock'},
  {from: 'egg', to: 'egg'},
  {from: 'see-no-evil', to: 'ignore'},
  {from: 'camera-flash', to: 'snapshot'},
  {from: 'alembic', to: 'experiment'},
  {from: 'mag', to: 'seo'},
  {from: 'label', to: 'types'},
  {from: 'seedling', to: 'seed'},
  {from: 'triangular-flag-on-post', to: 'flags'},
  {from: 'goal-net', to: 'catch'},
  {from: 'animation', to: 'animation'},
  {from: 'wastebasket', to: 'clean'},
  {from: 'passport-control', to: 'roles'},
  {from: 'adhesive-bandage', to: 'patch'},
  {from: 'monocle-face', to: 'data'},
  {from: 'coffin', to: 'rip'},
];

// @note default from git-cz
const types = {
  chore: {
    code: ':computer_disk:',
    description: 'Changes that don’t modify src or test files',
    emoji: '💽️',
    entity: '&#x1f4bd;',
    hidden: false,
    name: 'computer-disk',
    release: null,
    section: 'Changes that don’t modify src or test files',
    semver: null,
    value: 'chore',
  },
};

const gitmoji = async () => {
  // eslint-disable-next-line array-callback-return
  await items.map((item) => {
    const rewrite = _find(rewrites, {from: item.name});
    types[rewrite.to] = {
      code: item.code,
      description: item.description,
      emoji: item.emoji,
      entity: item.entity,
      hidden: false,
      name: item.name,
      release: item.semver || null,
      section: item.description,
      semver: item.semver,
      value: rewrite.to,
    };
  });
};

gitmoji();

module.exports = {
  types,
};
