module.exports = [
  {
    type: 'confirm',
    name: 'commit-all',
    message: 'Shall we commit all files to local git?',
    default: true
  },
  {
    type: 'input',
    name: 'commit-msg',
    message: 'What\'s the message of the commit?',
    default: 'init',
    when: props => props['commit-all']
  }
];
