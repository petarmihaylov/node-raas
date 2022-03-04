/* eslint-disable new-cap */
import * as soap from 'soap'
import * as uuid from 'uuid'
import {notSupported} from '..'

export enum RaasMethods {
  LogOn = 'LogOn',
  GetReportParameters = 'GetReportParameters',
  ExecuteReport = 'ExecuteReport',
  RetrieveReport = 'RetrieveReport',
  LogOff = 'LogOff',
}

export type RaasCredential = {
  UserName: string;
  Password: string;
  ClientAccessKey: string;
  UserAccessKey: string;
};

export type RunParams = {
  retrieveReportRetries: number;
  dataRetrievedOrError: boolean;
};

export type Clients = {
  executeClient: soap.Client;
  streamClient: soap.Client;
};

export type RaasResponseBase = [
  string,
  {
    Action: {
      attributes: {
        's:mustUnderstand': string;
      };
      $value: string;
    };
  },
  string,
];

export type LogOnResultTypeDefinition = {
  ClientAccessKey: string;
  Status: string;
  StatusMessage: string;
  ServiceId?: string;
  Token?: string;
  InstanceKey?: string;
};

export type LogOnResponse = [
  {
    LogOnResult: LogOnResultTypeDefinition;
  },
  string,
  {
    Action: {
      attributes: {
        's:mustUnderstand': string;
      };
      $value: string;
    };
  },
  string,
];

export type LogOffResultTypeDefinition = {
  ClientAccessKey: string;
  Status: string;
};

export type LogOffResponse = [
  {
    LogOffResult: LogOffResultTypeDefinition;
  },
  string,
  {
    Action: {
      attributes: {
        's:mustUnderstand': string;
      };
      $value: string;
    };
  },
  string,
];

export type ExecuteReportResultTypeDefinition = {
  Status: string;
  StatusMessage?: string;
  ReportKey?: string;
  ReportRetrievalUrl?: string;
};

export type ExecuteReportResponse = [
  {
    ExecuteReportResult: ExecuteReportResultTypeDefinition;
  },
  string,
  {
    Action: {
      attributes: {
        's:mustUnderstand': string;
      };
      $value: string;
    };
  },
  string,
];

export type ReportParameterElement = {
  Name: string;
  Required: boolean;
  DataType: string;
  MultiValued: boolean;
};

export type GetReportParametersResultTypeDefinition = {
  ReportParameters: {
    ReportParameter?: ReportParameterElement[];
  };
  Status: string;
  StatusMessage: string;
};

export type RetrieveReportResponse = [
  {
    ReportStream: string;
  },
  string,
  {
    Action: {
      attributes: {
        's:mustUnderstand': string;
      };
      $value: string;
    };
    Status: string;
    StatusMessage?: string;
  },
  string,
];

export type GetReportParametersResponse = [
  {
    GetReportParametersResult: GetReportParametersResultTypeDefinition;
  },
  string,
  {
    Action: {
      attributes: {
        's:mustUnderstand': string;
      };
      $value: string;
    };
    Status: string;
    StatusMessage?: string;
  },
  string,
];

export interface RaasLogOnCallResult {
  hasErrors: boolean;
  correlationId: string;
  result: LogOnResponse;
}

export interface RaasLogOffCallResult {
  hasErrors: boolean;
  correlationId: string;
  result: LogOffResponse;
}

export interface RaasExecuteReportCallResult {
  hasErrors: boolean;
  correlationId: string;
  result: ExecuteReportResponse;
}

export interface RaasRetrieveReportCallResult {
  hasErrors: boolean;
  errorMessage?: string;
  hasWarnings: boolean;
  warningMessage?: string;
  correlationId: string;
  result: RetrieveReportResponse;
}

export interface RaasGetReportParametersCallResult {
  hasErrors: boolean;
  errorMessage?: string;
  hasWarnings: boolean;
  warningMessage?: string;
  correlationId: string;
  requiredParams: ReportParameterElement[];
  result: GetReportParametersResponse;
}

export async function config(baseEndpoint: string): Promise<Clients> {
  const url = `https://${baseEndpoint}/services/BIDataService`
  const executeClient: soap.Client = await soap.createClientAsync(url, {
    forceSoap12Headers: true, // Force SOAP 1.2 as required by RaaS
    escapeXML: false, // Required to ensure that when using reeport paths, the quotes for folder and report names are not escapepd
  })
  executeClient.addHttpHeader('Content-Type', 'application/soap+xml')

  // ╔═╗┌┬┐┬─┐┌─┐┌─┐┌┬┐┬┌┐┌┌─┐  ╔═╗┬  ┬┌─┐┌┐┌┌┬┐  ╔═╗┌─┐┌┐┌┌─┐┬┌─┐
  // ╚═╗ │ ├┬┘├┤ ├─┤││││││││ ┬  ║  │  │├┤ │││ │   ║  │ ││││├┤ ││ ┬
  // ╚═╝ ┴ ┴└─└─┘┴ ┴┴ ┴┴┘└┘└─┘  ╚═╝┴─┘┴└─┘┘└┘ ┴   ╚═╝└─┘┘└┘└  ┴└─┘

  const streamingServiceUrl = `https://${baseEndpoint}/services/BIStreamingService`
  const streamClient: soap.Client = await soap.createClientAsync(
    streamingServiceUrl,
    {
      forceSoap12Headers: true, // Force SOAP 1.2 as required by RaaS
      escapeXML: false, // Required to ensure that when using reeport paths, the quotes for folder and report names are not escapepd
    },
  )
  streamClient.addHttpHeader('Content-Type', 'application/soap+xml')
  streamClient.wsdl.xmlnsInEnvelope +=
    ' xmlns:h="http://www.ultipro.com/dataservices/bistream/2"'

  return {
    executeClient,
    streamClient,
  }
}

export function addAddressingHeader(soapClient: soap.Client) {
  if (
    soapClient.wsdl.xmlnsInEnvelope.search(
      'xmlns:a="http://www.w3.org/2005/08/addressing"',
    ) === -1
  ) {
    soapClient.wsdl.xmlnsInEnvelope +=
      ' xmlns:a="http://www.w3.org/2005/08/addressing"'
  }
}

export function addActionHeader(clients: Clients, method: RaasMethods) {
  switch (method) {
  case RaasMethods.LogOn:
  case RaasMethods.GetReportParameters:
  case RaasMethods.ExecuteReport:
  case RaasMethods.LogOff:
    clients.executeClient.clearSoapHeaders()
    // This is a required header for RaaS
    clients.executeClient.addSoapHeader({
      'a:Action': `http://www.ultipro.com/dataservices/bidata/2/IBIDataService/${method}`,
    })
    break
  case RaasMethods.RetrieveReport:
    clients.streamClient.clearSoapHeaders()
    // This is a required header for RaaS
    clients.streamClient.addSoapHeader({
      'a:Action': `http://www.ultipro.com/dataservices/bistream/2/IBIStreamService/${method}`,
    })
  }
}

export async function login(
  clients: Clients,
  raasCredential: RaasCredential,
): Promise<RaasLogOnCallResult> {
  // This is a required xmlns for RaaS
  addAddressingHeader(clients.executeClient)
  addActionHeader(clients, RaasMethods.LogOn)

  // perform a login
  const logOnCorrelationId = uuid.v4()
  clients.executeClient.addHttpHeader('US-CORRELATION-ID', logOnCorrelationId)
  const logOnResponse: LogOnResponse = await clients.executeClient
  .LogOnAsync(
    {
      logOnRequest: raasCredential,
    },
    // We can pass in the generated correlationId to the client so our internal 'exchangeIds' match the
    // US-CORRELATION-ID passed to RaaS.
    {
      exchangeId: logOnCorrelationId,
    },
  )
  .then((result: LogOnResponse) => {
    // console.log(result);
    // console.log(result[0].LogOnResult);
    // Logon result
    // return result[0].LogOnResult;
    return result
  })
  .catch((error: any) => {
    throw new Error(error)
  })

  const objToReturn = {
    correlationId: logOnCorrelationId,
    result: logOnResponse,
  }

  if (logOnResponse[0].LogOnResult.Status === 'Ok') {
    return {
      hasErrors: false,
      ...objToReturn,
    }
  }

  return {
    hasErrors: true,
    ...objToReturn,
  }
}

export async function getReportParameters(
  clients: Clients,
  logOnResult: LogOnResultTypeDefinition,
  reportPathOrId: string,
): Promise<RaasGetReportParametersCallResult> {
  // This is a required xmlns for RaaS
  addAddressingHeader(clients.executeClient)
  addActionHeader(clients, RaasMethods.GetReportParameters)

  const getReportParametersArgs = {
    reportPath: reportPathOrId,
    context: logOnResult,
  }

  const getReportParametersCorrelationId = uuid.v4()
  clients.executeClient.addHttpHeader(
    'US-CORRELATION-ID',
    getReportParametersCorrelationId,
  )

  const getReportParametersRunResult: GetReportParametersResponse =
    await clients.executeClient
    .GetReportParametersAsync(getReportParametersArgs)
    .then((result: GetReportParametersResponse) => {
      return result
    })
    .catch((error: any) => {
      throw new Error(error)
    })

  let requiredParams: ReportParameterElement[] = []

  if (
    getReportParametersRunResult[0].GetReportParametersResult.Status ===
    'Success'
  ) {
    requiredParams =
      getReportParametersRunResult[0].GetReportParametersResult.ReportParameters?.ReportParameter?.filter(
        (element: ReportParameterElement) => {
          return element.Required === true
        },
      ) || []
  }

  const objToReturn = {
    correlationId: getReportParametersCorrelationId,
    requiredParams,
    result: getReportParametersRunResult,
  }

  return {
    // Indicate errors if Status !== "Success"
    hasErrors:
      getReportParametersRunResult[0].GetReportParametersResult.Status !==
      'Success',
    // If we do have an error, report it
    errorMessage:
      getReportParametersRunResult[0].GetReportParametersResult.Status ===
      'Success' ?
        '' :
        getReportParametersRunResult[0].GetReportParametersResult
        .StatusMessage,
    // Indicate warnings if there are any required parameters
    hasWarnings: requiredParams.length > 0,
    // Pass along the required parameters are not supported message
    warningMessage:
      requiredParams.length > 0 ?
        notSupported.reportWithRequiredParemeters :
        '',
    ...objToReturn,
  }
}

export async function executeReport(
  clients: Clients,
  logOnResult: LogOnResultTypeDefinition,
  reportPathOrId: string,
): Promise<RaasExecuteReportCallResult> {
  // This is a required xmlns for RaaS
  addAddressingHeader(clients.executeClient)
  addActionHeader(clients, RaasMethods.ExecuteReport)

  const executeReportArgs = {
    request: {
      ReportPath: reportPathOrId,
      ReportParameters: [],
    },
    context: logOnResult,
  }

  const executeReportCorrelationId = uuid.v4()
  clients.executeClient.addHttpHeader(
    'US-CORRELATION-ID',
    executeReportCorrelationId,
  )

  const executeReportRunResult: ExecuteReportResponse =
    await clients.executeClient
    .ExecuteReportAsync(executeReportArgs)
    .then((result: ExecuteReportResponse) => {
      return result
    })
    .catch((error: any) => {
      throw new Error(error)
    })

  const objToReturn = {
    correlationId: executeReportCorrelationId,
    result: executeReportRunResult,
  }

  if (executeReportRunResult[0].ExecuteReportResult.Status === 'Success') {
    return {
      hasErrors: false,
      ...objToReturn,
    }
  }

  return {
    hasErrors: true,
    ...objToReturn,
  }
}

export async function retrieveReport(
  clients: Clients,
  executeReportResult: ExecuteReportResultTypeDefinition,
): Promise<RaasRetrieveReportCallResult> {
  addAddressingHeader(clients.streamClient)
  addActionHeader(clients, RaasMethods.RetrieveReport)

  clients.streamClient.addSoapHeader({
    'h:ReportKey': executeReportResult.ReportKey,
  })

  const retrieveReportCorrelationId = uuid.v4()
  clients.streamClient.addHttpHeader(
    'US-CORRELATION-ID',
    retrieveReportCorrelationId,
  )
  const retrieveReportRunResult: RetrieveReportResponse =
    await clients.streamClient
    .RetrieveReportAsync()
    .then((result: any) => {
      return result
    })
    .catch((error: any) => {
      throw new Error(error)
    })

  const objToReturn = {
    correlationId: retrieveReportCorrelationId,
    result: retrieveReportRunResult,
  }

  if (retrieveReportRunResult[2]?.Status === 'Working') {
    return {
      hasErrors: false,
      hasWarnings: true,
      warningMessage: notSupported.longRunningReports,
      ...objToReturn,
    }
  }

  if (retrieveReportRunResult[2].Status === 'Failed') {
    return {
      hasErrors: true,
      errorMessage: retrieveReportRunResult[2].StatusMessage,
      hasWarnings: false,
      ...objToReturn,
    }
  }

  return {
    hasErrors: false,
    hasWarnings: false,
    ...objToReturn,
  }
}

export async function logOff(
  clients: Clients,
  logOnResult: LogOnResultTypeDefinition,
): Promise<RaasLogOffCallResult> {
  addAddressingHeader(clients.executeClient)
  clients.executeClient.clearSoapHeaders()
  clients.executeClient.addSoapHeader({
    'a:Action':
      'http://www.ultipro.com/dataservices/bidata/2/IBIDataService/LogOff',
  })

  const logOffCorrelationId = uuid.v4()
  clients.executeClient.addHttpHeader('US-CORRELATION-ID', logOffCorrelationId)

  const logOffRunResult: any = await clients.executeClient
  .LogOffAsync({
    context: logOnResult,
  })
  .then((result: any) => {
    return result
  })
  .catch((error: any) => {
    throw new Error(error)
  })

  const objToReturn = {
    correlationId: logOffCorrelationId,
    result: logOffRunResult,
  }

  if (logOffRunResult[0].LogOffResult.Status === 'LoggedOff') {
    return {
      hasErrors: false,
      ...objToReturn,
    }
  }

  return {
    hasErrors: true,
    ...objToReturn,
  }
}
