import chalk from 'chalk';
import {RaasRetrieveReportCallResult} from './core-raas';

export const upgradeSuggestion = `
For a production-ready, feature-rich solution, consider using ${chalk.green(
  'Ubirr',
)}.

Run 'node-raas ubirr' or visit ${chalk.green(
  'https://ubirrsoft.com/',
)} to learn more.`;

export const extendedUpgradeSuggestion = `${upgradeSuggestion}

${chalk.green(
  'Ubirr',
)} provides advanced functionality such as detailed loggin and easily configurable options.

${chalk.green('Ubirr')} provides:
* Retrieve long-running reports
* UTF-8 encoded files in XML, CSV, or JSON
* Easily configure more reports by modifying a text file - no code updates required
* Automate an UNLIMITED number of reports!
* Detailed logging
* US-CORRELATION-ID for additional debugging support
* Built using NodeJS and TypeScript
* Runs in Docker
`;

export const biDataServiceErrors = [
  {
    message: '',
    suggestions:
      'Unhandled error occurred. Please run node-raas with the -v flag and paste the REQUES/RESPONSE combination as an issue at https://github.com/petarmihaylov/node-raas. \n!!WARNING!!: IF THIS ERROR OCCURRED DURING A LOGON REQUEST, REMOVE YOUR CREDENTIALS FROM THE REQUEST BEFORE POSTING!!',
  },
  {
    message:
      'Unable to retrieve your report parameters. Please submit a new report request',
    suggestions:
      'Confirm the Report Path or ID is valid for the selected environment. Confirm the report functions correctly when open and run in Business Intelligence.',
  },
  {
    message: 'User authentication failed',
    suggestions:
      'Confirm the username, password and user API key are correct. Confirm the account is not locked, Inactive, or Suspended.',
  },
  {
    message: 'There was a problem with the authentication process',
    suggestions:
      'Confirm that you are passing in the correct Customer API Key and Base Endpoint URL. Run node-raas pull --help for information on how to obtain/verify the Customer API Key. ',
  },
  {
    message:
      'Unable to execute your report. Please submit a new report request',
    suggestions: `Confirm that you are passing a vaid Report Path or a ID surrounded by double quotes and exactly as they appear on BI (Cognos).
  Run node-raas pull --help for more information and examples.
    `,
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
      For such reports, an employee user account must be used.`,
  },
];

export const biStreamingServiceErrors = [
  {
    message: '',
    suggestions:
      'Unhandled error occurred. Please run node-raas with the -v flag and paste the REQUES/RESPONSE combination as an issue at https://github.com/petarmihaylov/node-raas.',
  },
  {
    message:
      'Unable to retrieve the report. Please create a new report request',
    suggestions:
      'This error indicates the Report Key passed has already been retrieved or a call to the RetrieveReport method was cancelled before a reply was receiced. Please execute a new report.',
  },
  {
    message:
      'Unable to retrieve your report. Please submit a new report request.',
    suggestions:
      'The requested ReportKey is invalid. This error should not occur under an official, unmodified node-raas release.',
  },
];

export const notSupported = {
  reportWithRequiredParemeters: `This report uses required parameters. Submitting parameters is not supported in node-raas and attempting to run a report with a required parameter will fail.
${upgradeSuggestion}`,

  longRunningReports: `Long-running reports for which data is not returned with the response from
the initial call to the RetrieveReport method are not supported by node-raas.
Such reports require additional logic to facilitate retry calls to RetrieveReport.

${upgradeSuggestion}`,
};

// Used for LogOn and ExecuteReport errors
export function handleBiDataServiceErrors(
  obj: any,
  errorNode: string,
  verbose = false,
): void {
  let identifiedError: {message: string; suggestions: string}[] = [];

  const action = errorNode.slice(0, -6);

  try {
    identifiedError = biDataServiceErrors.filter((e) => {
      return e.message === obj.result[0][errorNode].StatusMessage;
    });
  } catch {
    throw new Error('Invalid errorNode parameter.');
  }

  // If the error is not defined, push the default error
  if (identifiedError.length === 0)
    identifiedError.push(biDataServiceErrors[0]);

  const error = verbose
    ? new Error(`
${chalk.blue(`${action}:`)} ${chalk.red('Failed')}
${chalk.blue('US-CORRELATION-ID:')} ${chalk.magenta(obj.correlationId)}
${chalk.blue(`${errorNode}:`)} ${chalk.red(
        JSON.stringify(obj.result[0][errorNode], undefined, 2),
      )}
${chalk.blue('SOAP Request Headers:')} ${chalk.red(
        JSON.stringify(obj.result[2], undefined, 2),
      )}
${chalk.blue('Raw XML Request:')} ${chalk.red(
        JSON.stringify(obj.result[3], undefined, 2),
      )}
${chalk.blue('Raw XML Response:')} ${chalk.red(
        JSON.stringify(obj.result[1], undefined, 2),
      )}
Troubleshooting suggestions:
${chalk.yellow(identifiedError[0].suggestions)}`)
    : new Error(
        `\n  ${chalk.blue(`${action}:`)} ${chalk.red(
          'Failed',
        )} \n  ${chalk.blue('US-CORRELATION-ID:')} ${chalk.magenta(
          obj.correlationId,
        )} \n  ${chalk.red(
          JSON.stringify(obj.result[0], undefined, 2),
        )} \n Troubleshooting suggestions: ${chalk.yellow(
          identifiedError[0].suggestions,
        )}`,
      );
  throw error;
}

export function handleBiStreamingServiceErrors(
  obj: RaasRetrieveReportCallResult,
  verbose = false,
): void {
  let identifiedError: {message: string; suggestions: string}[] = [];

  try {
    identifiedError = biStreamingServiceErrors.filter((e) => {
      return e.message === obj.result[2].StatusMessage;
    });
  } catch {
    throw new Error('Invalid errorNode parameter.');
  }

  // If the error is not defined, push the default error
  if (identifiedError.length === 0)
    identifiedError.push(biStreamingServiceErrors[0]);

  const error = verbose
    ? new Error(`
${chalk.blue('RetrieveReport:')} ${chalk.red('Failed')}
${chalk.blue('US-CORRELATION-ID:')} ${chalk.magenta(obj.correlationId)}
${chalk.blue('ReportStream:')} ${chalk.red(
        JSON.stringify(obj.result[0].ReportStream, undefined, 2),
      )}
${chalk.blue('SOAP Request Headers:')} ${chalk.red(
        JSON.stringify(obj.result[2], undefined, 2),
      )}
${chalk.blue('Raw XML Request:')} ${chalk.red(
        JSON.stringify(obj.result[3], undefined, 2),
      )}
${chalk.blue('Raw XML Response:')} ${chalk.red(
        JSON.stringify(obj.result[1], undefined, 2),
      )}
Troubleshooting suggestions:
${chalk.yellow(identifiedError[0].suggestions)}`)
    : new Error(
        `\n  ${chalk.blue('RetrieveReport:')} ${chalk.red(
          'Failed',
        )} \n  ${chalk.blue('US-CORRELATION-ID:')} ${chalk.magenta(
          obj.correlationId,
        )} \n  ${chalk.red(
          JSON.stringify(obj.result[0], undefined, 2),
        )} \n Troubleshooting suggestions: ${chalk.yellow(
          identifiedError[0].suggestions,
        )}`,
      );
  throw error;
}
