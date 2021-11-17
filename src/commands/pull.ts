import {Command, flags} from '@oclif/command'
import { biStreamingServiceErrors, Clients, executeReport, getReportParameters, logOff, RaasCredential, RaasRetrieveReportCallResult, retrieveReport, RetrieveReportResponse } from '..';
import { config, login, RaasExecuteReportCallResult, RaasLogOffCallResult, RaasLogOnCallResult } from '../core-raas';
import { biDataServiceErrors, handleBiDataServiceErrors, handleBiStreamingServiceErrors } from '../error';
import { yellow, blue, magenta, green, red } from 'chalk';
import cli from 'cli-ux'
import { blueMagenta } from '../utils/formatters';

export default class Pull extends Command {
  static description = 'Pull data from a BI report through Reports as a Service (RAAS).'

  static examples = [
    `$ node-raas pull "i22500177CDE54018AC31713BEBE2F644" -u ServiceAccount -p "u(3Unv0ERjlaksdjf*jfa89wfjklj23j!@3j423j#OI@^j2342" -c B5JLX -a BB7VDK0000K0 -e rental4.ultipro.com`,
    `$ node-raas pull "/content/folder[@name='zzzCompany Folders']/folder[@name='Eastwood Industries - Master SC(72)']/folder[@name='UltiPro']/folder[@name='Customs']/report[@name='Audit Report 2']" -u ServiceAccount -p "u(3Unv0ERjlaksdjf*jfa89wfjklj23j!@3j423j#OI@^j2342" -c B5JLX -a BB7VDK0000K0 -e rental4.ultipro.com`,
  ]

  static flags = {
    // flag with no value (-h, --help)
    help: flags.help({char: 'h'}),
    // flag with a value (-u, --username="VALUE")
    username: flags.string({char: 'u', required: true, description: 'Username of user or service account. User is required for pulling UKG Time Management data.'}),
    // flag with a value (-p, --password="VALUE")
    password: flags.string({char: 'p', required: true, description: 'Password for the provided username.'}),
    // flag with a value (-c, --customer-api-key="VALUE")
    customerApiKey: flags.string({char: 'c', required: true, description: 'A 5-character alpha-numeric key from UKG Pro > MENU > SYSTEM CONFIGURATION > Security > Service Account Administration.'}),
    // flag with a value (-a, --user-api-key="VALUE")
    userApiKey: flags.string({char: 'a', required: true, description: 'A 12-character alpha-numeric key for the provided username from UKG Pro > MENU > SYSTEM CONFIGURATION > Security > Service Account Administration.'}),
    // flag with a value (-e, --base-endpoint-url="VALUE")
    baseEndpointUrl: flags.string(
      {char: 'e', required: true,
      options: ['servicet.ultipro.com','service2.ultipro.com', 'service3.ultipro.ca', 'service4.ultipro.com', 'service5.ultipro.com', 'rental2.ultipro.com', 'rental3.ultipro.ca', 'rental4.ultipro.com', 'rental5.ultipro.com'],
      description: 'Base endpoint URL from UKG Pro > MENU > SYSTEM CONFIGURATION > Security > Web Services. Do not include the protocol (https://).'
    }),
    // flag with no value (-l, --list-creds)
    printCreds: flags.boolean(
      {char: 'l', description: 'Print the credentials. Useful when ensuring flag input is processed correctly. As a best practice, credentials should be surrounded in double-quotes.', default: false}
    ),
    // flag with no value (-v, --verbose)
    verbose: flags.boolean(
      {char: 'v', description: 'Output raw request/response combination for failing requests.', default: false}
    )
  }

  static args = [
    {
      name: 'reportPathOrId',
      required: true,
      description: 'Report path or ID from Cognos (BI). Obtained by inspecting Properties of a BI report. (Right-click > Properties > General > Advanced > [Search path | ID].)'
    },
  ]

  async run() {
    const {args, flags} = this.parse(Pull)

    const reportPath = args.reportPathOrId[0] === 'i' ? `storeID("${args.reportPathOrId}")` : args.reportPathOrId

    const raasCredential: RaasCredential = {
      UserName: flags.username,
      Password: flags.password,
      ClientAccessKey: flags.customerApiKey,
      UserAccessKey: flags.userApiKey
    }
    this.log(blue(`Starting a report pull...`))
    this.log(blueMagenta(`Report Path/ID:`, reportPath))

    if (flags.printCreds) {
      this.log(blueMagenta(`Username:`, flags.username))
      this.log(blueMagenta(`Password:`, flags.password));
      this.log(blueMagenta(`Customer API Key:`, flags.customerApiKey));
      this.log(blueMagenta(`User API Key:`, flags.userApiKey));
      this.log(blueMagenta(`Base Endpoint URL:`, flags.baseEndpointUrl));
    }

    // Set up the SOAP clients
    const clients: Clients = await config(flags.baseEndpointUrl);

    // Login - Start
    cli.action.start(blue('LogOn'));
    const startTimeLogOn = Date.now();
    const logOnResult: RaasLogOnCallResult = await login(clients, raasCredential);
    if (logOnResult.hasErrors) {
      handleBiDataServiceErrors(logOnResult, 'LogOnResult', flags.verbose);
    }
    const msElapsedLogOn = Date.now() - startTimeLogOn;
    // this.log(`${blue(`LogOn:`)} ${green(`Success`)} | ${blue(`US-CORRELATION-ID:`)} ${magenta(logOnResult.correlationId)}`)
    cli.action.stop(`${green(`Success`)} | ${blue(`US-CORRELATION-ID:`)} ${magenta(logOnResult.correlationId)} | ${blueMagenta(`Took:`, `${msElapsedLogOn / 1000}s`)}`)
    // Login - End

    // GetReportParameters - Start
    cli.action.start(blue('GetReportParameters'));
    const startTimerGetReportParameters = Date.now();
    const getReportParametersResult: any = await getReportParameters(clients, logOnResult.result[0].LogOnResult, reportPath )
    // this.log(JSON.stringify(getReportParametersResult, undefined, 2));

    // In the case of an error
    if (getReportParametersResult.hasErrors) { handleBiDataServiceErrors(getReportParametersResult, 'GetReportParametersResult', flags.verbose);}

    if (getReportParametersResult.hasWarnings) {
      if (!flags.verbose) {
        this.error(`${blue(`GetReportParameters:`)} ${red(`Warn`)}
        Troubleshooting suggestions:
        ${yellow(getReportParametersResult.warningMessage)}`);
      } else {
        this.error(`${blue(`GetReportParameters:`)} ${red(`Warn`)}
${blue(`US-CORRELATION-ID:`)} ${magenta(getReportParametersResult.correlationId)}
${blue(`GetReportParametersResult:`)} ${red(JSON.stringify(getReportParametersResult.result[0].GetReportParametersResult, undefined, 2))}
${blue(`SOAP Request Headers:`)} ${red(JSON.stringify(getReportParametersResult.result[2], undefined, 2))}
${blue(`Raw XML Request:`)} ${red(JSON.stringify(getReportParametersResult.result[3], undefined, 2))}
${blue(`Raw XML Response:`)} ${red(JSON.stringify(getReportParametersResult.result[1], undefined, 2))}
Troubleshooting suggestions:
${yellow(getReportParametersResult.warningMessage)}`)
      }
    }


    const msElapsedGetReportParameters = Date.now() - startTimerGetReportParameters;
    cli.action.stop(`${green(`Success`)} | ${blue(`US-CORRELATION-ID:`)} ${magenta(logOnResult.correlationId)} | ${blueMagenta(`Took:`, `${msElapsedGetReportParameters / 1000}s`)}`)
    // GetReportParameters - End

    // Execute Report - Start
    cli.action.start(blue('ExecuteReport'))
    const startTimeExecuteReport = Date.now();
    const executeReportResult: RaasExecuteReportCallResult = await executeReport(clients, logOnResult.result[0].LogOnResult, reportPath);
    if (executeReportResult.hasErrors) {
      handleBiDataServiceErrors(executeReportResult, 'ExecuteReportResult', flags.verbose);
    }
    const msElapsedExecuteReport = Date.now() - startTimeExecuteReport;
    cli.action.stop(`${green(`Success`)} | ${blue(`US-CORRELATION-ID:`)} ${magenta(executeReportResult.correlationId)} | ${blueMagenta(`Took:`, `${msElapsedExecuteReport / 1000}s`)}`)
    // Execute Report - End

    // Retrieve Report - Start
    cli.action.start(blue('RetrieveReport'));
    const startTimeRetrieveReport = Date.now();
    const retrieveReportResult:RaasRetrieveReportCallResult = await retrieveReport(clients, executeReportResult.result[0].ExecuteReportResult)
    const msElapsedRetrieveReport = Date.now() - startTimeRetrieveReport;
    // In the case of an error
    if (retrieveReportResult.hasErrors) { handleBiStreamingServiceErrors(retrieveReportResult, flags.verbose);}

    // When Status === 'Working'
    if (retrieveReportResult.hasWarnings) {
      if (!flags.verbose) {
        this.error(`${blue(`RetrieveReport:`)} ${red(`Warn`)}
        Troubleshooting suggestions:
        ${yellow(retrieveReportResult.warningMessage)}`);
      } else {
        this.error(`${blue(`RetrieveReport:`)} ${red(`Warn`)}
${blue(`US-CORRELATION-ID:`)} ${magenta(retrieveReportResult.correlationId)}
${blue(`ReportStream:`)} ${red(JSON.stringify(retrieveReportResult.result[0].ReportStream, undefined, 2))}
${blue(`SOAP Request Headers:`)} ${red(JSON.stringify(retrieveReportResult.result[2], undefined, 2))}
${blue(`Raw XML Request:`)} ${red(JSON.stringify(retrieveReportResult.result[3], undefined, 2))}
${blue(`Raw XML Response:`)} ${red(JSON.stringify(retrieveReportResult.result[1], undefined, 2))}
Troubleshooting suggestions:
${yellow(retrieveReportResult.warningMessage)}`)
      }
    }
    cli.action.stop(`${green(`Success`)} | ${blue(`US-CORRELATION-ID:`)} ${magenta(executeReportResult.correlationId)} | ${blueMagenta(`Took:`, `${msElapsedRetrieveReport / 1000}s`)}`)
    // Retrieve Report - End

    // LogOff - Start
    cli.action.start(blue('LogOff'));
    const startTimeLogOff = Date.now();
    const logOffResult: Promise<RaasLogOffCallResult> = await logOff(clients, logOnResult.result[0].LogOnResult);
    if (logOnResult.hasErrors) {
      handleBiDataServiceErrors(logOffResult, 'LogOfResult', flags.verbose);
    }
    const msElapsedLogOff = Date.now() - startTimeLogOff;
    // this.log(`${blue(`LogOn:`)} ${green(`Success`)} | ${blue(`US-CORRELATION-ID:`)} ${magenta(logOnResult.correlationId)}`)
    cli.action.stop(`${green(`Success`)} | ${blue(`US-CORRELATION-ID:`)} ${magenta(logOnResult.correlationId)} | ${blueMagenta(`Took:`, `${msElapsedLogOff / 1000}s`)}`)
    // LogOff - End
  }
}
