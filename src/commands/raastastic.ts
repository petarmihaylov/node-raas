import {Command} from '@oclif/command'
import chalk from 'chalk'
import {extendedUpgradeSuggestion} from '..'

export default class Pull extends Command {
  static description = 'Displays information about RaasTastic - a production-ready, feature-rich set of tools built on top of node-raas.'

  async run() {
    this.log(chalk.blue(extendedUpgradeSuggestion))
  }
}
