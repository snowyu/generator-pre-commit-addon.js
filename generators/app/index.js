'use strict';

const Generator = require('@ngx-rocket/core');
const chalk = require('chalk');
const pkg = require('../../package.json');
const prompts = require('./prompts');

function isString(value) {
  return typeof value === 'string';
}

class PreCommitAddonGenerator extends Generator {
  // DO NOT add a constructor, it won't be called.
  // Use initializing() method instead.
  //
  // See Yeoman's doc run loop priorities for the list of specific tasks:
  // http://yeoman.io/authoring/running-context.html

  initializing() {
    // Setting version allows Yeoman to notify the user of updates
    this.version = pkg.version;
    this.log(`Using ${chalk.cyan('pre-commit-addon')} ${chalk.green(this.version)}`);
    this.spawnCommandSync('git', ['init', '--quiet']);

    this._addCommit = function (message) {
      var commitMessage = isString(message) ? message : 'init';
      this.spawnCommandSync('git', ['add', '--all']);
      this.spawnCommandSync('git', ['commit', '-m', commitMessage, '--quiet']);
    }

  }

  beforeWriting() {
    // Augment this generator's properties with shared properties so it can be
    // used in templates
    Object.assign(this.props, this.sharedProps);
  }

  //writing end.
  conflicts() {
    if (this.props['commit-all']) {
      this._addCommit(this.props['commit-msg']);
    }
  }

}

module.exports = Generator.make({
  // Base directory of your templates
  baseDir: __dirname,

  // Your generator (optional, you can use only templates)
  generator: PreCommitAddonGenerator,

  // Your generator prompts (optional)
  // See https://github.com/sboudrias/Inquirer.js#objects for details
  prompts
});
