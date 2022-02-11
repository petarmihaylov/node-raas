import chalk from 'chalk';
import {
  Clients,
  login,
  RaasCredential,
  RaasLogOnCallResult,
  RaasGetReportParametersCallResult,
  getReportParameters,
  RaasExecuteReportCallResult,
  executeReport,
  RaasRetrieveReportCallResult,
  retrieveReport,
  RaasLogOffCallResult,
  logOff,
} from './core-raas';
import {
  handleBiDataServiceErrors,
  handleBiStreamingServiceErrors,
} from './errors';
import {blueMagenta} from '../utils/formatters';
import cli from 'cli-ux';

export async function logOnAction(
  clients: Clients,
  raasCredential: RaasCredential,
  flags: any,
): Promise<RaasLogOnCallResult> {
  // Login - Start
  cli.action.start(chalk.blue('LogOn'));
  const startTimeLogOn = Date.now();
  const logOnResult: RaasLogOnCallResult = await login(clients, raasCredential);
  if (logOnResult.hasErrors) {
    handleBiDataServiceErrors(logOnResult, 'LogOnResult', flags.verbose);
  }

  const msElapsedLogOn = Date.now() - startTimeLogOn;
  // this.log(`${blue(`LogOn:`)} ${green(`Success`)} | ${blue(`US-CORRELATION-ID:`)} ${magenta(logOnResult.correlationId)}`)
  cli.action.stop(
    `${chalk.green('Success')} | ${chalk.blue(
      'US-CORRELATION-ID:',
    )} ${chalk.magenta(logOnResult.correlationId)} | ${blueMagenta(
      'Took:',
      `${msElapsedLogOn / 1000}s`,
    )}`,
  );
  // Login - End
  return logOnResult;
}

export async function getReportParametersAction(
  clients: Clients,
  logOnResult: RaasLogOnCallResult,
  reportPath: string,
  flags: any,
): Promise<void> {
  // GetReportParameters - Start
  cli.action.start(chalk.blue('GetReportParameters'));
  const startTimerGetReportParameters = Date.now();
  const getReportParametersResult: RaasGetReportParametersCallResult =
    await getReportParameters(
      clients,
      logOnResult.result[0].LogOnResult,
      reportPath,
    );
  // this.log(JSON.stringify(getReportParametersResult, undefined, 2));

  // Processing completed
  const msElapsedGetReportParameters =
    Date.now() - startTimerGetReportParameters;

  // In the case of an error
  if (getReportParametersResult.hasErrors) {
    cli.action.stop(
      `${chalk.red('Failed')} | ${blueMagenta(
        'Took:',
        `${msElapsedGetReportParameters / 1000}s`,
      )}`,
    );
    handleBiDataServiceErrors(
      getReportParametersResult,
      'GetReportParametersResult',
      flags.verbose,
    );
  }

  // Getting the parameters was successful, so we can note that here
  cli.action.stop(
    `${chalk.green('Success')} | ${chalk.blue(
      'US-CORRELATION-ID:',
    )} ${chalk.magenta(
      getReportParametersResult.correlationId,
    )} | ${blueMagenta('Took:', `${msElapsedGetReportParameters / 1000}s`)}`,
  );

  if (getReportParametersResult.hasWarnings) {
    const error = flags.verbose
      ? new Error(`${chalk.blue('GetReportParameters:')} ${chalk.red('Warn')}
${chalk.blue('US-CORRELATION-ID:')} ${chalk.magenta(
          getReportParametersResult.correlationId,
        )}
${chalk.blue('GetReportParametersResult:')} ${chalk.red(
          JSON.stringify(
            getReportParametersResult.result[0].GetReportParametersResult,
            undefined,
            2,
          ),
        )}
${chalk.blue('SOAP Request Headers:')} ${chalk.red(
          JSON.stringify(getReportParametersResult.result[2], undefined, 2),
        )}
${chalk.blue('Raw XML Request:')} ${chalk.red(
          JSON.stringify(getReportParametersResult.result[3], undefined, 2),
        )}
${chalk.blue('Raw XML Response:')} ${chalk.red(
          JSON.stringify(getReportParametersResult.result[1], undefined, 2),
        )}
Troubleshooting suggestions:
${chalk.yellow(getReportParametersResult.warningMessage)}`)
      : new Error(`${chalk.blue('GetReportParameters:')} ${chalk.red('Warn')}
Required Parameters:
${JSON.stringify(getReportParametersResult.requiredParams, undefined, 2)}
Troubleshooting suggestions:
${chalk.yellow(getReportParametersResult.warningMessage)}`);
    throw error;
  }

  cli.action.stop(
    `${chalk.green('Success')} | ${chalk.blue(
      'US-CORRELATION-ID:',
    )} ${chalk.magenta(
      getReportParametersResult.correlationId,
    )} | ${blueMagenta('Took:', `${msElapsedGetReportParameters / 1000}s`)}`,
  );
  // GetReportParameters - End

  if (flags?.console) {
    console.log(
      chalk.blue(
        JSON.stringify(
          getReportParametersResult.result[0].GetReportParametersResult,
          undefined,
          2,
        ),
      ),
    );
  }
}

export async function executeReportAction(
  clients: Clients,
  logOnResult: RaasLogOnCallResult,
  reportPath: string,
  flags: any,
): Promise<RaasExecuteReportCallResult> {
  // Execute Report - Start
  cli.action.start(chalk.blue('ExecuteReport'));
  const startTimeExecuteReport = Date.now();
  const executeReportResult: RaasExecuteReportCallResult = await executeReport(
    clients,
    logOnResult.result[0].LogOnResult,
    reportPath,
  );

  // Execute Report action completed
  const msElapsedExecuteReport = Date.now() - startTimeExecuteReport;

  if (executeReportResult.hasErrors) {
    cli.action.stop(
      `${chalk.red('Failed')} | ${blueMagenta(
        'Took:',
        `${msElapsedExecuteReport / 1000}s`,
      )}`,
    );
    handleBiDataServiceErrors(
      executeReportResult,
      'ExecuteReportResult',
      flags.verbose,
    );
  }

  cli.action.stop(
    `${chalk.green('Success')} | ${chalk.blue(
      'US-CORRELATION-ID:',
    )} ${chalk.magenta(executeReportResult.correlationId)} | ${blueMagenta(
      'Took:',
      `${msElapsedExecuteReport / 1000}s`,
    )}`,
  );
  // Execute Report - End
  return executeReportResult;
}

export async function retrieveReportActon(
  clients: Clients,
  executeReportResult: RaasExecuteReportCallResult,
  flags: any,
): Promise<RaasRetrieveReportCallResult> {
  // Retrieve Report - Start
  cli.action.start(chalk.blue('RetrieveReport'));
  const startTimeRetrieveReport = Date.now();
  const retrieveReportResult: RaasRetrieveReportCallResult =
    await retrieveReport(
      clients,
      executeReportResult.result[0].ExecuteReportResult,
    );
  const msElapsedRetrieveReport = Date.now() - startTimeRetrieveReport;
  // In the case of an error
  if (retrieveReportResult.hasErrors) {
    cli.action.stop(
      `${chalk.green('Success')} | ${blueMagenta(
        'Took:',
        `${msElapsedRetrieveReport / 1000}s`,
      )}`,
    );
    handleBiStreamingServiceErrors(retrieveReportResult, flags.verbose);
  }

  // When Status === 'Working'
  if (retrieveReportResult.hasWarnings) {
    const error = flags.verbose
      ? new Error(`${chalk.blue('RetrieveReport:')} ${chalk.red('Warn')}
${chalk.blue('US-CORRELATION-ID:')} ${chalk.magenta(
          retrieveReportResult.correlationId,
        )}
${chalk.blue('ReportStream:')} ${chalk.red(
          JSON.stringify(
            retrieveReportResult.result[0].ReportStream,
            undefined,
            2,
          ),
        )}
${chalk.blue('SOAP Request Headers:')} ${chalk.red(
          JSON.stringify(retrieveReportResult.result[2], undefined, 2),
        )}
${chalk.blue('Raw XML Request:')} ${chalk.red(
          JSON.stringify(retrieveReportResult.result[3], undefined, 2),
        )}
${chalk.blue('Raw XML Response:')} ${chalk.red(
          JSON.stringify(retrieveReportResult.result[1], undefined, 2),
        )}
Troubleshooting suggestions:
${chalk.yellow(retrieveReportResult.warningMessage)}`)
      : new Error(`${chalk.blue('RetrieveReport:')} ${chalk.red('Warn')}
Troubleshooting suggestions:
${chalk.yellow(retrieveReportResult.warningMessage)}`);
    throw error;
  }

  cli.action.stop(
    `${chalk.green('Success')} | ${chalk.blue(
      'US-CORRELATION-ID:',
    )} ${chalk.magenta(executeReportResult.correlationId)} | ${blueMagenta(
      'Took:',
      `${msElapsedRetrieveReport / 1000}s`,
    )}`,
  );
  // Retrieve Report - End
  return retrieveReportResult;
}

export async function logOffAction(
  clients: Clients,
  logOnResult: RaasLogOnCallResult,
  flags: any,
): Promise<any> {
  // LogOff - Start
  cli.action.start(chalk.blue('LogOff'));
  const startTimeLogOff = Date.now();
  const logOffResult: RaasLogOffCallResult = await logOff(
    clients,
    logOnResult.result[0].LogOnResult,
  );
  if (logOnResult.hasErrors) {
    handleBiDataServiceErrors(logOffResult, 'LogOfResult', flags.verbose);
  }

  const msElapsedLogOff = Date.now() - startTimeLogOff;
  // this.log(`${blue(`LogOn:`)} ${green(`Success`)} | ${blue(`US-CORRELATION-ID:`)} ${magenta(logOnResult.correlationId)}`)
  cli.action.stop(
    `${chalk.green('Success')} | ${chalk.blue(
      'US-CORRELATION-ID:',
    )} ${chalk.magenta(logOnResult.correlationId)} | ${blueMagenta(
      'Took:',
      `${msElapsedLogOff / 1000}s`,
    )}`,
  );
  // LogOff - End
  return {};
}
