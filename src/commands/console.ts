import {Command, flags} from '@oclif/command'
import { biStreamingServiceErrors, Clients, executeReport, logOff, RaasCredential, RaasRetrieveReportCallResult, retrieveReport, RetrieveReportResponse } from '..';
import { config, login, RaasExecuteReportCallResult, RaasLogOffCallResult, RaasLogOnCallResult } from '../core-raas';
import { biDataServiceErrors } from '../error';
import { yellow, blue, magenta, green, red } from 'chalk';
import cli from 'cli-ux'
import * as inquirer from 'inquirer'

export default class Pull extends Command {
  static description = 'Quickly test reports and access with this interactive console pulling data from a BI report through Reports as a Service (RAAS).'

  static examples = [
    `$ node-raas console`,
    `$ node-raas console -e rental4.ultipro.com`,
  ]

  static flags = {
    // flag with no value (-h, --help)
    help: flags.help({char: 'h'}),
    // flag with a value (-e, --base-endpoint-url="VALUE")
    baseEndpointUrl: flags.string(
      {char: 'e',
      options: ['servicet.ultipro.com','service2.ultipro.com', 'service3.ultipro.ca', 'service4.ultipro.com', 'service5.ultipro.com', 'rental2.ultipro.com', 'rental3.ultipro.ca', 'rental4.ultipro.com', 'rental5.ultipro.com'],
      description: 'Base endpoint URL from UKG Pro > MENU > SYSTEM CONFIGURATION > Security > Web Services. Do not include the protocol (https://).'
    }),
    // flag with no value (-v, --verbose)
    verbose: flags.boolean(
      {char: 'v', description: 'Output raw request/response combination for failing requests.'}
    )
  }

  async run() {
    const {args, flags} = this.parse(Pull)

    let baseEndpointUrl = flags.baseEndpointUrl;
    let verbose = flags.verbose;

    let responses: any = await inquirer.prompt([{
      name: 'baseEndpointUrl',
      message: 'Select your environment:',
      type: 'rawlist',
      // Ask for this when the base endpoint was not set via a parameter
      when: () => {
        return flags.baseEndpointUrl === undefined;
      },
      default: 8,
      loop: true,
      choices: [
        new inquirer.Separator('PRODUCTION Environments'),
        {name: 'service2.ultipro.com'},
        {name: 'service3.ultipro.ca'},
        {name: 'service4.ultipro.com'},
        {name: 'service5.ultipro.com'},
        new inquirer.Separator('TEST Environments'),
        {name: 'rental2.ultipro.com'},
        {name: 'rental3.ultipro.ca'},
        {name: 'rental4.ultipro.com'},
        {name: 'rental5.ultipro.com'},
        {name: 'servicet.ultipro.com'},
      ]
    },
    {
      name: 'maskPassword',
      message: 'Mask password input?',
      type: 'confirm',
      default: true,
    },
    {
      name: 'username',
      message: 'Enter an employee username or a service account username:',
      type: 'input',
      validate: (input) => input.length !== 0 ? true : 'Username cannot be blank. Please enter a username.'
    },
    {
      name: 'password',
      message: 'Enter the password:',
      type: 'password',
      when: (responses: any) => responses.maskPassword === true,
      mask: '*',
      validate: (input) => input.length !== 0 ? true : 'Password cannot be blank. Please enter a password.'
    },
    {
      name: 'password',
      message: 'Enter the password:',
      type: 'input',
      when: (responses: any) => responses.maskPassword === false,
      validate: (input) => input.length !== 0 ? true : 'Password cannot be blank. Please enter a password.'
    },
    {
      name: 'userApiKey',
      message: 'Enter User API Key (12-characters):',
      type: 'input',
      validate: (input) => input.length === 12 ? true : 'Please enter a valid 12-character User API Key from UKG Pro > MENU > SYSTEM CONFIGURATION > Security > Service Account Administration (Service Accounts) | Web Services (Employee Users) page. Service Accounts that have the same Username in PROD and TEST (if available) may still have different User API Keys in each environment.'
    },
    {
      name: 'customerApiKey',
      message: 'Enter Customer API Key (5-characters):',
      type: 'input',
      validate: (input) => input.length === 5 ? true :  'Please enter a valid 5-character ampha-numeric Customer API Key. This is the 5-character alpha-numeric key listed at the top-left in UKG Pro > MENU > SYSTEM CONFIGURATION > Security > Service Account Administration page. The Customer API Key in PRODUCTION and TEST (if available) are different.'
    },
    {
      name: 'verbose',
      message: 'Verbose output?\n(Print the raw request/response pair for calls that result in an error.)',
      type: 'confirm',
      // Ask for this when the verbosity flag is not passed endpoint was not set via a parameter
      when: () => {
        return flags.verbose === undefined;
      },
      default: false
    },
    {
      name: 'verbose',
      message: 'WARNING: Earlier you selected to hide the password. Error on the LogOn step will print your credentials to the console when Verbose output is selected. Please confirm Verbose output should be enabled:',
      type: 'confirm',
      askAnswered: true,
      // Ask for this when the verbosity flag is not passed endpoint was not set via a parameter
      when: (responses: any) => {
        return responses.maskPassword === true && responses.verbose === true
      },
      default: false
    }
  ])

      this.log(responses);
  }
}
