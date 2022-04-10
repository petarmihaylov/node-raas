import {Command} from '@oclif/core';
import chalk from 'chalk';
import {extendedUpgradeSuggestion} from '..';

export default class Pull extends Command {
  static description =
    'Displays information about Ubirr - a production-ready, feature-rich set of tools built on top of node-raas.';

  async run(): Promise<void> {
    this.log(chalk.blue(extendedUpgradeSuggestion));
  }
}
