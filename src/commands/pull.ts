import {Command, Flags} from '@oclif/core'
import {
  Clients,
  config,
  RaasCredential,
  RaasExecuteReportCallResult,
  RaasLogOnCallResult,
  RaasRetrieveReportCallResult,
} from '../lib/core-raas'
import chalk from 'chalk'
import {
  blueMagenta,
  decodeStream,
  FileExportExtensions,
  saveStream,
} from '../utils/formatters'
import {
  executeReportAction,
  getReportParametersAction,
  logOffAction,
  logOnAction,
  retrieveReportAction,
} from '../lib/actions'

export default class Pull extends Command {
  static description =
    'Pull data from a BI report through Reports as a Service (RAAS).';

  static examples = [
    '$ node-raas pull "i22500177CDE54018AC31713BEBE2F644" -u ServiceAccount -p "u(3Unv0ERjlaksdjf*jfa89wfjklj23j!@3j423j#OI@^j2342" -c B5JLX -a BB7VDK0000K0 -e rental4.ultipro.com',
    "$ node-raas pull \"/content/folder[@name='zzzCompany Folders']/folder[@name='Eastwood Industries - Master SC(72)']/folder[@name='UltiPro']/folder[@name='Customs']/report[@name='Audit Report 2']\" -u ServiceAccount -p \"u(3Unv0ERjlaksdjf*jfa89wfjklj23j!@3j423j#OI@^j2342\" -c B5JLX -a BB7VDK0000K0 -e rental4.ultipro.com",
  ];

  static flags = {
    // flag with no value (-h, --help)
    help: Flags.help({char: 'h'}),
    // flag with a value (-u, --username="VALUE")
    username: Flags.string({
      char: 'u',
      required: true,
      description:
        'Username of user or service account. Employee User is required for pulling UKG Time Management data.',
      env: 'USERNAME',
    }),
    // flag with a value (-p, --password="VALUE")
    password: Flags.string({
      char: 'p',
      required: true,
      description:
        'Password for the provided username. Be sure to escape any special characters for your command line. (Ex: ! should be \\! in bash shells.)',
      env: 'PASSWORD',
    }),
    // flag with a value (-c, --customer-api-key="VALUE")
    customerApiKey: Flags.string({
      char: 'c',
      required: true,
      description:
        'A 5-character alpha-numeric key from UKG Pro > MENU > SYSTEM CONFIGURATION > Security > Service Account Administration or Web Services.',
      env: 'CUSTOMER_API_KEY',
    }),
    // flag with a value (-a, --user-api-key="VALUE")
    userApiKey: Flags.string({
      char: 'a',
      required: true,
      description:
        'A 12-character alpha-numeric key for the provided username from UKG Pro > MENU > SYSTEM CONFIGURATION > Security > Service Account Administration. If using an Employee User use the User API Key from UKG Pro > MENU > SYSTEM CONFIGURATION > Security > Web Services.',
      env: 'USER_API_KEY',
    }),
    // flag with a value (-e, --base-endpoint-url="VALUE")
    baseEndpointUrl: Flags.string({
      char: 'e',
      required: true,
      options: [
        'servicet.ultipro.com',
        'service2.ultipro.com',
        'service3.ultipro.ca',
        'service4.ultipro.com',
        'service5.ultipro.com',
        'rental2.ultipro.com',
        'rental3.ultipro.ca',
        'rental4.ultipro.com',
        'rental5.ultipro.com',
      ],
      description:
        'Base endpoint URL from UKG Pro > MENU > SYSTEM CONFIGURATION > Security > Web Services. Do not include the protocol (https://).',
      env: 'BASE_ENDPOINT_URL',
    }),
    // flag with no value (-l, --list-creds)
    printCreds: Flags.boolean({
      char: 'l',
      description:
        'Print the credentials. Useful when ensuring flag input is processed correctly. As a best practice, credentials should be surrounded in double-quotes and any special characters for your conssole escaped. (Ex: ! should be \\! in bash.)',
      default: false,
    }),
    // flag with no value (-v, --verbose)
    verbose: Flags.boolean({
      char: 'v',
      description:
        'Output raw request/response combination for failing requests.',
      default: false,
      env: 'VERBOSE',
    }),
  };

  static args = [
    {
      name: 'reportPathOrId',
      required: true,
      description:
        'Report path or ID from Cognos (BI). Obtained by inspecting Properties of a BI report. (Right-click > Properties > General > Advanced > [Search path | ID].)',
      default: process.env.REPORT_PATH_OR_ID,
    },
  ];

  async run(): Promise<void> {
    const {args, flags} = await this.parse(Pull)

    const reportPath =
      args.reportPathOrId[0] === 'i' ?
        `storeID("${args.reportPathOrId}")` :
        args.reportPathOrId

    const raasCredential: RaasCredential = {
      UserName: flags.username,
      Password: flags.password,
      ClientAccessKey: flags.customerApiKey,
      UserAccessKey: flags.userApiKey,
    }
    this.log(chalk.blue('Starting a report pull...'))
    this.log(blueMagenta('Report Path/ID:', reportPath))

    if (flags.printCreds) {
      this.log(blueMagenta('Username:', flags.username))
      this.log(blueMagenta('Password:', flags.password))
      this.log(blueMagenta('Customer API Key:', flags.customerApiKey))
      this.log(blueMagenta('User API Key:', flags.userApiKey))
      this.log(blueMagenta('Base Endpoint URL:', flags.baseEndpointUrl))
    }

    // Set up the SOAP clients
    const clients: Clients = await config(flags.baseEndpointUrl)

    // console.log(clients);
    // console.log(raasCredential);

    const logOnResult: RaasLogOnCallResult = await logOnAction(
      clients,
      raasCredential,
      flags,
    ).catch((error: any) => {console.log(error)});
    await getReportParametersAction(clients, logOnResult, reportPath, flags)
    const executeReportResult: RaasExecuteReportCallResult =
      await executeReportAction(clients, logOnResult, reportPath, flags)
    const retrieveReportResult: RaasRetrieveReportCallResult =
      await retrieveReportAction(clients, executeReportResult, flags)
    const decodedStream = decodeStream(
      retrieveReportResult.result[0].ReportStream,
    )
    await saveStream(decodedStream, 'export', FileExportExtensions.XML)
    await logOffAction(clients, logOnResult, flags)
  }
}
