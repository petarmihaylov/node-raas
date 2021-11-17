import { blue, green, magenta, red, yellow } from "chalk"
import { RaasRetrieveReportCallResult } from "./core-raas"

export const upgradeSuggestion = `
For a production-ready, feature-rich solution, consider using ${green(`RaasTastic`)}.

Run 'node-raas raastastic' or visit ${green('https://raastastic.com/ to learn more.')}`

export const extendedUpgradeSuggestion = `${upgradeSuggestion}

${green(`RaasTastic`)} is currently in development and is being built on top of our node-raas CLI to
provide advanced functionality through the ${green(`RaasTastic`)} CLI and ${green(`RaasTastic`)} REST API Server.

Below are some (but not all) of the ${green(`RaasTastic`)} planned features.

${green(`RaasTastic`)} CLI:
* Retrive long running repots
* Execute advanced reports using parameters
* Export decoded stream to JSON / CSV
* ${green(`RaasTastic`)} Docker image
* JSON-fromatted logs
* Increased security via credential splitting
* ... and more!

${green(`RaasTastic`)} REST API Server:
* Interact with Reports as a Service through an easy and intuitive REST API
* Implicit restriction to allowed reports
* Report data stored in-memory only through redis
* Upon retrievel, reports are purged from memory
* Configure report expiration - purges the report data if not retrieved within the specified timeframe
* ... and more!

Stay up to date with the development progress and register for the upcoming
private Beta for early adopters by visiting ${green(`RaasTastic`)} https://raastastic.com/updates.
`

export const biDataServiceErrors = [
  {
    message: '',
    suggestions: 'Unhandled error occurred. Please run node-raas with the -v flag and paste the REQUES/RESPONSE combination as an issue at https://github.com/petarmihaylov/node-raas. \n!!WARNING!!: IF THIS ERROR OCCURRED DURING A LOGON REQUEST, REMOVE YOUR CREDENTIALS FROM THE REQUEST BEFORE POSTING!!',
  },
  {
    message: 'User authentication failed',
    suggestions: 'Confirm the username, password and user API key are correct. Confirm the account is not locked, Inactive, or Suspended.'
  },
  {
    message: 'There was a problem with the authentication process',
    suggestions: 'Confirm that you are pssing in the correct Customer API Key and Base Endpoint URL. Run node-raas pull --help for information on how to obtain/verify the Customer API Key. '
  },
  {
    message: 'Unable to execute your report. Please submit a new report request',
    suggestions: `Confirm that you are passing a vaid Report Path or a ID surrounded by double quotes and exactly as they appear on BI (Cognos).
  Run node-raas pull --help for more information and examples.
    `
  },
  {
    message: 'BI data service runtime error occurred',
    suggestions: `Generic error indicating an issue with the report.
  Possible causes include:
    * The BI report is invalid/corrput and does not run for anyone.
    * Provided ID or Report Path to the report is incorrect
      ** The ID can change due to:
        *** TEST environment refresh
        *** Overwriting an existing report using 'Save As'
        *** Deleting an existing report and creating a new report with the same name.
      ** The Report Path can change due to:
        *** TEST environment refresh
        *** Changing the name of the report
        *** Moving the report to a different location within the BI folder structure.
    * The user/service account does not have access to the:
      ** BI report
      ** report package the BI report is using
    * Using a service account to run a BI report pulling data using the Time Management package.
      For such reports, an employee user account must be used.`
  },
]

export const biStreamingServiceErrors = [
  {
    message: '',
    suggestions: 'Unhandled error occurred. Please run node-raas with the -v flag and paste the REQUES/RESPONSE combination as an issue at https://github.com/petarmihaylov/node-raas.',
  },
  {
    message: 'Unable to retrieve the report. Please create a new report request',
    suggestions: `This error indicates the Report Key passed has already been retrieved or a call to the RetrieveReport method was cancelled before a reply was receiced. Please execute a new report.`
  },
  {
    message: 'Unable to retrieve your report. Please submit a new report request.',
    suggestions: `The requested ReportKey is invalid. This error should not occur under an official, unmodified node-raas release.`
  }
]

export const notSupported = {
  reportWithRequiredParemeters: `This report uses required parameters. Submitting parameters is not supported in node-raas and attempting to run a report with a required parameter will fail.
${upgradeSuggestion}`,

  longRunningReports: `Long-running reports for which data is not returned with the response from
the initial call to the RetrieveReport method are not supported by node-raas.
Such reports require additional logic to facilitate retry calls to RetrieveReport.

${upgradeSuggestion}`
}

// Used for LogOn and ExecuteReport errors
export function handleBiDataServiceErrors(obj: any, errorNode: string, verbose:boolean): void {
  let identifiedError: { message: string, suggestions: string}[] = []

  const action = errorNode.slice(0, -6);

  try {
    identifiedError = biDataServiceErrors.filter(e => {
      return e.message === obj.result[0][errorNode].StatusMessage
    })
  } catch(e) {
    throw new Error('Invalid errorNode parameter.');
  }
  // If the error is not defined, push the default error
  if (identifiedError.length === 0) identifiedError.push(biDataServiceErrors[0])

  if (!verbose) {
    throw new Error(`\n  ${blue(`${action}:`)} ${red(`Failed`)} \n  ${blue(`US-CORRELATION-ID:`)} ${magenta(obj.correlationId)} \n  ${red(JSON.stringify(obj.result[0], undefined, 2))} \n Troubleshooting suggestions: ${yellow(identifiedError[0].suggestions)}`)
  } else {
    throw new Error(`
${blue(`${action}:`)} ${red(`Failed`)}
${blue(`US-CORRELATION-ID:`)} ${magenta(obj.correlationId)}
${blue(`${errorNode}:`)} ${red(JSON.stringify(obj.result[0][errorNode], undefined, 2))}
${blue(`SOAP Request Headers:`)} ${red(JSON.stringify(obj.result[2], undefined, 2))}
${blue(`Raw XML Request:`)} ${red(JSON.stringify(obj.result[3], undefined, 2))}
${blue(`Raw XML Response:`)} ${red(JSON.stringify(obj.result[1], undefined, 2))}
Troubleshooting suggestions:
${yellow(identifiedError[0].suggestions)}`)
  }
}

export function handleBiStreamingServiceErrors(obj: RaasRetrieveReportCallResult, verbose:boolean): void {
  let identifiedError: { message: string, suggestions: string}[] = []

  try {
    identifiedError = biStreamingServiceErrors.filter(e => {
      return e.message === obj.result[2].StatusMessage
    })
  } catch(e) {
    throw new Error('Invalid errorNode parameter.');
  }
  // If the error is not defined, push the default error
  if (identifiedError.length === 0) identifiedError.push(biStreamingServiceErrors[0])

  if (!verbose) {
    throw new Error(`\n  ${blue(`RetrieveReport:`)} ${red(`Failed`)} \n  ${blue(`US-CORRELATION-ID:`)} ${magenta(obj.correlationId)} \n  ${red(JSON.stringify(obj.result[0], undefined, 2))} \n Troubleshooting suggestions: ${yellow(identifiedError[0].suggestions)}`)
  } else {
    throw new Error(`
${blue(`RetrieveReport:`)} ${red(`Failed`)}
${blue(`US-CORRELATION-ID:`)} ${magenta(obj.correlationId)}
${blue(`ReportStream:`)} ${red(JSON.stringify(obj.result[0].ReportStream, undefined, 2))}
${blue(`SOAP Request Headers:`)} ${red(JSON.stringify(obj.result[2], undefined, 2))}
${blue(`Raw XML Request:`)} ${red(JSON.stringify(obj.result[3], undefined, 2))}
${blue(`Raw XML Response:`)} ${red(JSON.stringify(obj.result[1], undefined, 2))}
Troubleshooting suggestions:
${yellow(identifiedError[0].suggestions)}`)
  }
}