import {Command, flags} from '@oclif/command'
import chalk from 'chalk'
import * as inquirer from 'inquirer'
import {executeReportAction, getReportParametersAction, logOffAction, logOnAction, retrieveReportActon} from '../lib/actions'
import {Clients, config, RaasCredential, RaasExecuteReportCallResult, RaasLogOnCallResult, RaasRetrieveReportCallResult} from '../lib/core-raas'
import {decodeStream} from '../utils/formatters'

export default class Pull extends Command {
  static description = 'Quickly test reports and access with this interactive console pulling data from a BI report through Reports as a Service (RAAS).'

  static examples = [
    '$ node-raas console',
    '$ node-raas console -e rental4.ultipro.com',
  ]

  static flags = {
    // flag with no value (-h, --help)
    help: flags.help({char: 'h'}),
    // flag with a value (-u, --username="VALUE")
    username: flags.string({char: 'u', description: 'Username of user or service account. Employee user is required for pulling UKG Time Management data.'}),
    // flag with a value (-p, --password="VALUE")
    password: flags.string({char: 'p', description: 'Password for the provided username.'}),
    // flag with a value (-c, --customer-api-key="VALUE")
    customerApiKey: flags.string({char: 'c', description: 'A 5-character alpha-numeric key from UKG Pro > MENU > SYSTEM CONFIGURATION > Security > Service Account Administration.'}),
    // flag with a value (-a, --user-api-key="VALUE")
    userApiKey: flags.string({char: 'a', description: 'A 12-character alpha-numeric key for the provided username from UKG Pro > MENU > SYSTEM CONFIGURATION > Security > Service Account Administration.'}),
    // flag with a value (-e, --base-endpoint-url="VALUE")
    baseEndpointUrl: flags.string(
      {char: 'e',
        options: ['servicet.ultipro.com', 'service2.ultipro.com', 'service3.ultipro.ca', 'service4.ultipro.com', 'service5.ultipro.com', 'rental2.ultipro.com', 'rental3.ultipro.ca', 'rental4.ultipro.com', 'rental5.ultipro.com'],
        description: 'Base endpoint URL from UKG Pro > MENU > SYSTEM CONFIGURATION > Security > Web Services. Do not include the protocol (https://).',
      }),
    // flag with no value (-v, --verbose)
    verbose: flags.boolean(
      {char: 'v', description: 'Output raw request/response combination for failing requests.'},
    ),
    console: flags.boolean(),
  }

  async run() {
    const {flags} = this.parse(Pull)

    let responses: any = {}

    if (flags.baseEndpointUrl === undefined ||
      flags.username === undefined ||
      flags.password === undefined ||
      flags.customerApiKey === undefined ||
      flags.userApiKey === undefined ||
      flags.verbose === undefined
    ) {
      responses  = await inquirer.prompt([{
        name: 'baseEndpointUrl',
        message: 'Select your environment:',
        type: 'rawlist',
        // Ask for this when the base endpoint was not set via a parameter
        when: () => {
          return flags.baseEndpointUrl === undefined
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
        ],
      },
      {
        name: 'maskPassword',
        message: 'Mask password input?',
        type: 'confirm',
        default: true,
        when: () => {
          return flags.password === undefined
        },
      },
      {
        name: 'username',
        message: 'Enter an employee username or a service account username:',
        type: 'input',
        validate: input => input.length > 0 ? true : 'Username cannot be blank. Please enter a username.',
        when: () => {
          return flags.username === undefined
        },
      },
      {
        name: 'password',
        message: 'Enter the password:',
        type: 'password',
        when: (responses: any) => responses.maskPassword === true && flags.password === undefined,
        mask: '*',
        validate: input => input.length > 0 ? true : 'Password cannot be blank. Please enter a password.',
      },
      {
        name: 'password',
        message: 'Enter the password:',
        type: 'input',
        when: (responses: any) => responses.maskPassword === false && flags.password === undefined,
        validate: input => input.length > 0 ? true : 'Password cannot be blank. Please enter a password.',
      },
      {
        name: 'userApiKey',
        message: 'Enter User API Key (12-characters):',
        type: 'input',
        validate: input => input.length === 12 ? true : 'Please enter a valid 12-character User API Key from UKG Pro > MENU > SYSTEM CONFIGURATION > Security > Service Account Administration (Service Accounts) | Web Services (Employee Users) page. Service Accounts that have the same Username in PROD and TEST (if available) may still have different User API Keys in each environment.',
        when: () => {
          return flags.userApiKey === undefined
        },
      },
      {
        name: 'customerApiKey',
        message: 'Enter Customer API Key (5-characters):',
        type: 'input',
        validate: input => input.length === 5 ? true :  'Please enter a valid 5-character ampha-numeric Customer API Key. This is the 5-character alpha-numeric key listed at the top-left in UKG Pro > MENU > SYSTEM CONFIGURATION > Security > Service Account Administration page. The Customer API Key in PRODUCTION and TEST (if available) are different.',
        when: () => {
          return flags.customerApiKey === undefined
        },
      },
      {
        name: 'verbose',
        message: 'Verbose output?\n(Print the raw request/response pair for calls that result in an error.)',
        type: 'confirm',
        // Ask for this when the verbosity flag is not passed endpoint was not set via a parameter
        when: () => {
          return flags.verbose === undefined
        },
        default: false,
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
        default: false,
      }])
      // Assign the answer for verbosity back to flags so it can be passed to the *Action methods
      if (responses?.verbose) flags.verbose = responses.verbose
    }

    flags.console = true // Signal to actions that the call is coming from the console command

    const raasCredential: RaasCredential = {
      UserName: responses.username || flags.username,
      Password: responses.password || flags.password,
      ClientAccessKey: responses.customerApiKey || flags.customerApiKey,
      UserAccessKey: responses.userApiKey || flags.userApiKey,
    }

    // Ask the user what they would like to do
    const beginPrompt = [{
      name: 'action',
      message: 'What would you like to do?',
      type: 'rawlist',
      // Ask for this when the base endpoint was not set via a parameter
      default: 8,
      loop: true,
      choices: [
        {name: 'GetReportList'},
        {name: 'GetReportParameters'},
        {name: 'ExecuteReport'},
        {name: 'RetrieveReport'},
        {name: 'LogOff and Exit'},
      ],
    }]

    const getReportPathOrId = [{
      name: 'reportPathOrId',
      message: 'What is the Report Path or ID?',
      type: 'input',
      filter: (input: any) => {
        return input[0] === 'i' ? `storeID("${input}")` : input
      },
    }]

    const clients: Clients = await config(responses.baseEndpointUrl || flags.baseEndpointUrl)
    const logOnResult: RaasLogOnCallResult = await logOnAction(clients, raasCredential, flags)

    let reportPathOrId = ''
    let reportKey: string | undefined = ''
    // Used as a check to make sure the user retrieves reports for which they have started execution
    let retrievedLastReport = true
    let executeReportResult: RaasExecuteReportCallResult

    async function repl() {
      let answer = await inquirer.prompt(beginPrompt)

      let keepLooping = true

      const keepReportId = [{
        name: 'keepReportId',
        message: 'Enter a new Report Path or ID?',
        type: 'confirm',
        default: false,
      }]

      switch (answer.action) {
      case 'GetReportList':
        console.log(`Getting Report List for: ${answer.reportPathOrId} `)
        break
      case 'GetReportParameters':
        if (reportPathOrId === '') {
          answer = await inquirer.prompt(getReportPathOrId)
          reportPathOrId = answer.reportPathOrId
        } else {
          answer = await inquirer.prompt(keepReportId)
          if (answer.keepReportId) {
            answer = await inquirer.prompt(getReportPathOrId)
            reportPathOrId = answer.reportPathOrId
          }
        }

        await getReportParametersAction(clients, logOnResult, reportPathOrId, flags)
        .catch((error: any) => {
          console.error(error.message)
        })

        break
      case 'ExecuteReport':
        if (retrievedLastReport) {
          if (reportPathOrId === '') {
            answer = await inquirer.prompt(getReportPathOrId)
            reportPathOrId = answer.reportPathOrId
          } else {
            answer = await inquirer.prompt(keepReportId)
            if (answer.keepReportId) {
              answer = await inquirer.prompt(getReportPathOrId)
              reportPathOrId = answer.reportPathOrId
            }
          }

          try {
            executeReportResult = await executeReportAction(clients, logOnResult, reportPathOrId, flags)
          } catch (error) {
            let errorMessage = 'Failed to do something exceptional'
            if (error instanceof Error) {
              errorMessage = error.message
              console.error(errorMessage)
            }
          }

          // If there are  no errors store the report key and indicate there is a pending report
          if (!executeReportResult?.hasErrors) {
            reportKey = executeReportResult?.result[0].ExecuteReportResult.ReportKey
            retrievedLastReport = false
          }
        } else {
          console.log(chalk.red('Running more than one (1) report is not supported. Please run RetrieveReport first.'))
        }

        break
      case 'RetrieveReport':
        if (reportKey !== '' && retrievedLastReport === false) {
          const retrieveReportResult: RaasRetrieveReportCallResult = await retrieveReportActon(clients, executeReportResult, flags)
          const decodedStream = await decodeStream(retrieveReportResult.result[0].ReportStream)
          console.log(decodedStream)
          reportKey = ''
          retrievedLastReport = true
        } else (
          console.log(chalk.red('You must ExecuteReport before you can RetrieveReport.'))
        )
        break
      case 'LogOff and Exit':
        keepLooping = false
        break
      }

      if (keepLooping) {
        repl()
      } else {
        await logOffAction(clients, logOnResult, flags)
      }
    }

    await repl()
  }
}
