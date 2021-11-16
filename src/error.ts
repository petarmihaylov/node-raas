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

export const biStreamingServiceErrorsAndWarnings = [
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
