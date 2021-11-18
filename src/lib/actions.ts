import { blue, green, magenta, red, yellow } from "chalk";
import { Clients, login, RaasCredential, RaasLogOnCallResult, RaasGetReportParametersCallResult, getReportParameters, RaasExecuteReportCallResult, executeReport, RaasRetrieveReportCallResult, retrieveReport, RaasLogOffCallResult, logOff } from "./core-raas";
import { handleBiDataServiceErrors, handleBiStreamingServiceErrors } from "./errors";
import { blueMagenta } from "../utils/formatters";
import cli from 'cli-ux'

export async function logOnAction(clients: Clients, raasCredential: RaasCredential, flags: any): Promise<RaasLogOnCallResult> {
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
  return logOnResult
}

export async function getReportParametersAction(clients: Clients, logOnResult: RaasLogOnCallResult, reportPath: string, flags: any): Promise<void> {
  // GetReportParameters - Start
  cli.action.start(blue('GetReportParameters'));
  const startTimerGetReportParameters = Date.now();
  const getReportParametersResult: RaasGetReportParametersCallResult = await getReportParameters(clients, logOnResult.result[0].LogOnResult, reportPath )
  // this.log(JSON.stringify(getReportParametersResult, undefined, 2));

  // In the case of an error
  if (getReportParametersResult.hasErrors) { handleBiDataServiceErrors(getReportParametersResult, 'GetReportParametersResult', flags.verbose);}

  if (getReportParametersResult.hasWarnings) {
    if (!flags.verbose) {
      throw new Error(`${blue(`GetReportParameters:`)} ${red(`Warn`)}
Required Parameters:
${JSON.stringify(getReportParametersResult.requiredParams,undefined,2)}
Troubleshooting suggestions:
${yellow(getReportParametersResult.warningMessage)}`);
    } else {
      throw new Error(`${blue(`GetReportParameters:`)} ${red(`Warn`)}
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
}

export async function executeReportAction(clients: Clients,  logOnResult: RaasLogOnCallResult, reportPath: string, flags: any): Promise<RaasExecuteReportCallResult> {
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
  return executeReportResult
}

export async function retrieveReportActon(clients: Clients, executeReportResult: RaasExecuteReportCallResult, flags: any): Promise<RaasRetrieveReportCallResult> {
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
      throw new Error(`${blue(`RetrieveReport:`)} ${red(`Warn`)}
Troubleshooting suggestions:
${yellow(retrieveReportResult.warningMessage)}`);
    } else {
      throw new Error(`${blue(`RetrieveReport:`)} ${red(`Warn`)}
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
  return retrieveReportResult;
}

export async function logOffAction(clients: Clients,  logOnResult: RaasLogOnCallResult, flags: any): Promise<any> {
  // LogOff - Start
  cli.action.start(blue('LogOff'));
  const startTimeLogOff = Date.now();
  const logOffResult: RaasLogOffCallResult = await logOff(clients, logOnResult.result[0].LogOnResult);
  if (logOnResult.hasErrors) {
    handleBiDataServiceErrors(logOffResult, 'LogOfResult', flags.verbose);
  }
  const msElapsedLogOff = Date.now() - startTimeLogOff;
  // this.log(`${blue(`LogOn:`)} ${green(`Success`)} | ${blue(`US-CORRELATION-ID:`)} ${magenta(logOnResult.correlationId)}`)
  cli.action.stop(`${green(`Success`)} | ${blue(`US-CORRELATION-ID:`)} ${magenta(logOnResult.correlationId)} | ${blueMagenta(`Took:`, `${msElapsedLogOff / 1000}s`)}`)
  // LogOff - End
  return {}
}