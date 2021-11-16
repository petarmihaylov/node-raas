import * as soap from 'soap'
import * as uuid from 'uuid'

export type RaasCredential = {
  UserName: string,
  Password: string,
  ClientAccessKey: string,
  UserAccessKey: string,
}

export type RunParams = {
  retrieveReportRetries: number,
  dataRetrievedOrError: boolean
}

export type Clients = {
  executeClient: soap.Client,
  streamClient: soap.Client
}

export type RaasResponseBase = [
  string,
  {
    Action: {
      attributes: {
        "s:mustUnderstand": string
      },
      "$value": string
    }
  },
  string
]

export type LogOnResultTypeDefinition = {
  ClientAccessKey: string,
  Status: string,
  StatusMessage: string,
  ServiceId?: string,
  Token?: string,
  InstanceKey?: string,
}

export type LogOnResponse = [
  {
    LogOnResult: LogOnResultTypeDefinition
  },
  string,
  {
    Action: {
      attributes: {
        "s:mustUnderstand": string
      },
      "$value": string
    }
  },
  string
]

export type LogOffResultTypeDefinition = {
  ClientAccessKey: string,
  Status: string
}

export type LogOffResponse = [
  {
    LogOffResult: LogOffResultTypeDefinition
  },
  string,
  {
    Action: {
      attributes: {
        "s:mustUnderstand": string
      },
      "$value": string
    }
  },
  string
]

export type ExecuteReportResultTypeDefinition = {
  Status: string,
  StatusMessage?: string,
  ReportKey?: string,
  ReportRetrievalUrl?: string,
}

export type ExecuteReportResponse = [
  {
    ExecuteReportResult: ExecuteReportResultTypeDefinition
  },
  string,
  {
    Action: {
      attributes: {
        "s:mustUnderstand": string
      },
      "$value": string
    }
  },
  string
];

export type RetrieveReportResultTypeDefinition = {
  ReportStream: string | null
}

export type RetrieveReportResponse = [
  {
    ReportStream: RetrieveReportResultTypeDefinition
  },
  string,
  {
    Action: {
      attributes: {
        "s:mustUnderstand": string
      },
      "$value": string
    },
    Status: string
    StatusMessage?: string
  },
  string
];

export interface RaasLogOnCallResult {
  hasErrors: boolean,
  correlationId: string,
  result: LogOnResponse
}

export interface RaasLogOffCallResult {
  hasErrors: boolean,
  correlationId: string,
  result: LogOffResponse
}

export interface RaasExecuteReportCallResult {
  hasErrors: boolean,
  correlationId: string,
  result: ExecuteReportResponse
}

export interface RaasRetrieveReportCallResult {
  hasErrors: boolean,
  errorMessage?: string,
  hasWarnings: boolean,
  warningMessage?: string,
  correlationId: string,
  result: RetrieveReportResponse
}

export async function config(baseEndpoint: string): Promise<Clients> {
  const url = `https://${baseEndpoint}/services/BIDataService`;
  const executeClient: soap.Client = await soap.createClientAsync(url, {
    forceSoap12Headers: true, // Force SOAP 1.2 as required by RaaS
    escapeXML: false, // Required to ensure that when using reeport paths, the quotes for folder and report names are not escapepd
  });

  // ╔═╗┌┬┐┬─┐┌─┐┌─┐┌┬┐┬┌┐┌┌─┐  ╔═╗┬  ┬┌─┐┌┐┌┌┬┐  ╔═╗┌─┐┌┐┌┌─┐┬┌─┐
  // ╚═╗ │ ├┬┘├┤ ├─┤││││││││ ┬  ║  │  │├┤ │││ │   ║  │ ││││├┤ ││ ┬
  // ╚═╝ ┴ ┴└─└─┘┴ ┴┴ ┴┴┘└┘└─┘  ╚═╝┴─┘┴└─┘┘└┘ ┴   ╚═╝└─┘┘└┘└  ┴└─┘

  const streaminServiceUrl =
    "https://Servicet.ultipro.com/services/BIStreamingService";
  const streamClient: soap.Client = await soap.createClientAsync(streaminServiceUrl, {
    forceSoap12Headers: true, // Force SOAP 1.2 as required by RaaS
    escapeXML: false, // Required to ensure that when using reeport paths, the quotes for folder and report names are not escapepd
  });

  return {
    executeClient,
    streamClient,
  };
}

export function addAddressingHeader(soapClient: soap.Client) {
  if (
    soapClient.wsdl.xmlnsInEnvelope.search(
      'xmlns:a="http://www.w3.org/2005/08/addressing"'
    ) == -1
  ) {
    soapClient.wsdl.xmlnsInEnvelope +=
      ' xmlns:a="http://www.w3.org/2005/08/addressing"';
  }
}

export async function login(clients: Clients, raasCredential: RaasCredential): Promise<RaasLogOnCallResult> {
  clients.executeClient.addHttpHeader("Content-Type", "application/soap+xml");
  // This is a required xmlns for RaaS
  addAddressingHeader(clients.executeClient);
  clients.executeClient.clearSoapHeaders();
  // This is a required header for RaaS
  clients.executeClient.addSoapHeader({
    "a:Action":
      "http://www.ultipro.com/dataservices/bidata/2/IBIDataService/LogOn",
  });

  // perform a login
  const logOnCorrelationId = uuid.v4();
  clients.executeClient.addHttpHeader("US-CORRELATION-ID", logOnCorrelationId);
  const logOnResponse: LogOnResponse = await clients.executeClient
    .LogOnAsync(
      {
        logOnRequest: raasCredential,
      },
      // We can pass in the generated correlationId to the client so our internal 'exchangeIds' match the
      // US-CORRELATION-ID passed to RaaS.
      {
        exchangeId: logOnCorrelationId,
      }
    )
    .then((result: LogOnResponse) => {
      // console.log(result);
      // console.log(result[0].LogOnResult);
      // Logon result
      // return result[0].LogOnResult;
      return result
    })
    .catch((error: any) => {
      console.error(error.response.status);
      console.error(error.response.statusText);
      console.error(error.response.config);
      console.error(error.body);
    });

  const objToReturn = {
    correlationId: logOnCorrelationId,
    result: logOnResponse,
  }

  if (logOnResponse[0].LogOnResult.Status === "Ok") {
    return {
      hasErrors: false,
      ...objToReturn
    }
  } else {
    return {
      hasErrors: true,
      ...objToReturn
    }
  }
}

export async function executeReport(clients: Clients, logOnResult: LogOnResultTypeDefinition, reportPathOrId: string): Promise<RaasExecuteReportCallResult> {
  // This is a required xmlns for RaaS
  addAddressingHeader(clients.executeClient);

  // This is a required header for RaaS
  clients.executeClient.clearSoapHeaders();
  clients.executeClient.addSoapHeader({
    "a:Action":
      "http://www.ultipro.com/dataservices/bidata/2/IBIDataService/ExecuteReport",
  });

  const executeReportArgs = {
    request: {
      // ReportPath:
      //   "/content/folder[@name='UltiPro Sample Reports']/folder[@name='Sample Reports']/folder[@name='Human Resources Reports']/report[@name='Active Employee Listing']",
      // if the input starts with an i, parse it as storeID
      ReportPath: reportPathOrId,
      ReportParameters: [],
    },
    context: logOnResult,
  };

  const executeReportCorrelationId = uuid.v4();
  clients.executeClient.addHttpHeader("US-CORRELATION-ID", executeReportCorrelationId);

  const executeReportResult: ExecuteReportResponse = await clients.executeClient
    .ExecuteReportAsync(executeReportArgs)
    .then((result: ExecuteReportResponse) => {
      // console.log(result);
      // console.log(result[0].ExecuteReportResult);
      // Logon result
      // return result[0].ExecuteReportResult;
      return result;
    })
    .catch((error: any) => {
      // console.error(error.root.Envelope.Header.Action);
      console.error(error.response.status);
      console.error(error.response.statusText);
      console.error(error.response.config);
      console.error(error.body);
      // console.error(error.rawRequest);
      // console.error(error.rawResponse);
    });

  const objToReturn = {
    correlationId: executeReportCorrelationId,
    result: executeReportResult,
  }

  if (executeReportResult[0].ExecuteReportResult.Status === "Success") {
    return {
      hasErrors: false,
      ...objToReturn
    }
  } else {
    return {
      hasErrors: true,
      ...objToReturn
    }
  }
}

export async function retrieveReport(clients: Clients, executeReportResult: ExecuteReportResultTypeDefinition): Promise<RaasRetrieveReportCallResult> {
  addAddressingHeader(clients.streamClient);
  clients.streamClient.wsdl.xmlnsInEnvelope +=
    ' xmlns:h="http://www.ultipro.com/dataservices/bistream/2"';
  clients.streamClient.clearSoapHeaders();
  clients.streamClient.addSoapHeader({
    "a:Action":
      "http://www.ultipro.com/dataservices/bistream/2/IBIStreamService/RetrieveReport",
    "h:ReportKey": executeReportResult.ReportKey,
  });

  const retrieveReportCorrelationId = uuid.v4();
  clients.streamClient.addHttpHeader("US-CORRELATION-ID", retrieveReportCorrelationId);
  const retrieveReportRunResult: RetrieveReportResponse = await clients.streamClient
      .RetrieveReportAsync()
      .then((result: any) => {
        // console.log(result);
        // // console.log(result[0].LogOnResult);
        // // Logon result
        return result;
      })
      .catch((error: any) => {
        // If an error occurs, set to true stop the loop
        // console.error(error.root.Envelope.Header.Action);
        console.error(error.response.status);
        console.error(error.response.statusText);
        console.error(error.response.config);
        console.error(error.body);
        // console.error(error.rawRequest);
        // console.error(error.rawResponse);
      });

    const objToReturn = {
      correlationId: retrieveReportCorrelationId,
      result: retrieveReportRunResult
    }

    if (retrieveReportRunResult[2].Status === "Working") {
      return {
        hasErrors: false,
        hasWarnings: true,
        warningMessage: `Long-running reports for which data is not returned with the response from
the initial call to RetrieveReport method are not supported by node-raas. Such reports require additional logic to
facilitate retry calls to RetrieveReport.

For an production-ready, feature-rich solution, consider using RaasTastic https://raastastic.com by Studio350.`,
        ...objToReturn
      }
    } else if (retrieveReportRunResult[2].Status === "Failed") {
      return {
        hasErrors: true,
        errorMessage: retrieveReportRunResult[2].StatusMessage,
        hasWarnings: false,
        ...objToReturn
      }
    } else {
      return {
        hasErrors: false,
        hasWarnings: false,
        ...objToReturn
      }
    }
}

export async function logOff(clients: Clients, logOnResult: LogOnResultTypeDefinition): Promise<any> {
  addAddressingHeader(clients.executeClient);
  clients.executeClient.clearSoapHeaders();
  clients.executeClient.addSoapHeader({
    "a:Action":
      "http://www.ultipro.com/dataservices/bidata/2/IBIDataService/LogOff",
  });

  const logOffCorrelationId = uuid.v4();
  clients.executeClient.addHttpHeader("US-CORRELATION-ID", logOffCorrelationId);

  // Simulate wrong toke for
  logOnResult.Token += '111111'

  console.log(logOnResult);

  const logOffRunResult: any = await clients.executeClient
      .LogOffAsync({
        context: logOnResult
      })
      .then((result: any) => {
        // console.log(result);
        // // console.log(result[0].LogOnResult);
        // // Logon result
        return result;
      })
      .catch((error: any) => {
        // If an error occurs, set to true stop the loop
        // console.error(error.root.Envelope.Header.Action);
        console.error(error.response.status);
        console.error(error.response.statusText);
        console.error(error.response.config);
        console.error(error.body);
        // console.error(error.rawRequest);
        // console.error(error.rawResponse);
      });

      const objToReturn = {
      correlationId: logOffCorrelationId,
      result: logOffRunResult,
    }

    if (logOffRunResult[0].LogOffResult.Status === "LoggedOff") {
      return {
        hasErrors: false,
        ...objToReturn
      }
    } else {
      return {
        hasErrors: true,
        ...objToReturn
      }
    }
  return logOffRunResult;
}