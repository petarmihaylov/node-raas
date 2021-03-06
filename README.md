# node-raas

A tiny library and CLI for interacting with the Reports as a Service (RAAS) API from UKG (Ultimate Kronos Group) to pull reports without parameters. NOTE: Not published nor supported by UKG.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/node-raas.svg)](https://www.npmjs.com/package/@petarmihaylov/node-raas)
[![CircleCI](https://circleci.com/gh/petarmihaylov/node-raas/tree/master.svg?style=shield)](https://circleci.com/gh/petarmihaylov/node-raas/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/node-raas.svg)](https://npmjs.com/package/@petarmihaylov/node-raas)
[![License](https://img.shields.io/npm/l/node-raas.svg)](https://github.com/petarmihaylov/node-raas/blob/main/package.json)

<!-- toc -->
* [node-raas](#node-raas)
* [Usage](#usage)
* [Commands](#commands)
* [Use as a Library](#use-as-a-library)
* [Support for ENV variables and .env File](#support-for-env-variables-and-env-file)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g @petarmihaylov/node-raas
$ node-raas COMMAND
running command...
$ node-raas (--version)
@petarmihaylov/node-raas/0.0.20 linux-x64 node-v16.13.0
$ node-raas --help [COMMAND]
USAGE
  $ node-raas COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`node-raas autocomplete [SHELL]`](#node-raas-autocomplete-shell)
* [`node-raas console`](#node-raas-console)
* [`node-raas help [COMMAND]`](#node-raas-help-command)
* [`node-raas pull REPORTPATHORID`](#node-raas-pull-reportpathorid)
* [`node-raas ubirr`](#node-raas-ubirr)
* [`node-raas update [CHANNEL]`](#node-raas-update-channel)

## `node-raas autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ node-raas autocomplete [SHELL] [-r]

ARGUMENTS
  SHELL  shell type

FLAGS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

DESCRIPTION
  display autocomplete installation instructions

EXAMPLES
  $ node-raas autocomplete

  $ node-raas autocomplete bash

  $ node-raas autocomplete zsh

  $ node-raas autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v1.2.0/src/commands/autocomplete/index.ts)_

## `node-raas console`

Quickly test reports and access with this interactive console pulling data from a BI report through Reports as a Service (RAAS).

```
USAGE
  $ node-raas console [-h] [-u <value>] [-p <value>] [-c <value>] [-a <value>] [-e
    servicet.ultipro.com|service2.ultipro.com|service3.ultipro.ca|service4.ultipro.com|service5.ultipro.com|rental2.ulti
    pro.com|rental3.ultipro.ca|rental4.ultipro.com|rental5.ultipro.com] [-v] [--console]

FLAGS
  -a, --userApiKey=<value>        A 12-character alpha-numeric key for the provided username from UKG Pro > MENU >
                                  SYSTEM CONFIGURATION > Security > Service Account Administration.
  -c, --customerApiKey=<value>    A 5-character alpha-numeric key from UKG Pro > MENU > SYSTEM CONFIGURATION > Security
                                  > Service Account Administration.
  -e, --baseEndpointUrl=<option>  Base endpoint URL from UKG Pro > MENU > SYSTEM CONFIGURATION > Security > Web
                                  Services. Do not include the protocol (https://).
                                  <options: servicet.ultipro.com|service2.ultipro.com|service3.ultipro.ca|service4.ultip
                                  ro.com|service5.ultipro.com|rental2.ultipro.com|rental3.ultipro.ca|rental4.ultipro.com
                                  |rental5.ultipro.com>
  -h, --help                      Show CLI help.
  -p, --password=<value>          Password for the provided username.
  -u, --username=<value>          Username of user or service account. Employee user is required for pulling UKG Time
                                  Management data.
  -v, --verbose                   Output raw request/response combination for failing requests.
  --console

DESCRIPTION
  Quickly test reports and access with this interactive console pulling data from a BI report through Reports as a
  Service (RAAS).

EXAMPLES
  $ node-raas console

  $ node-raas console -e rental4.ultipro.com
```

_See code: [dist/commands/console.ts](https://github.com/petarmihaylov/node-raas/blob/v0.0.20/dist/commands/console.ts)_

## `node-raas help [COMMAND]`

display help for node-raas

```
USAGE
  $ node-raas help [COMMAND] [--all]

ARGUMENTS
  COMMAND  command to show help for

FLAGS
  --all  see all commands in CLI

DESCRIPTION
  display help for node-raas
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.3.1/src/commands/help.ts)_

## `node-raas pull REPORTPATHORID`

Pull data from a BI report through Reports as a Service (RAAS).

```
USAGE
  $ node-raas pull [REPORTPATHORID] -u <value> -p <value> -c <value> -a <value> -e
    servicet.ultipro.com|service2.ultipro.com|service3.ultipro.ca|service4.ultipro.com|service5.ultipro.com|rental2.ulti
    pro.com|rental3.ultipro.ca|rental4.ultipro.com|rental5.ultipro.com [-h] [-l] [-v]

ARGUMENTS
  REPORTPATHORID  Report path or ID from Cognos (BI). Obtained by inspecting Properties of a BI report. (Right-click >
                  Properties > General > Advanced > [Search path | ID].)

FLAGS
  -a, --userApiKey=<value>        (required) A 12-character alpha-numeric key for the provided username from UKG Pro >
                                  MENU > SYSTEM CONFIGURATION > Security > Service Account Administration. If using an
                                  Employee User use the User API Key from UKG Pro > MENU > SYSTEM CONFIGURATION >
                                  Security > Web Services.
  -c, --customerApiKey=<value>    (required) A 5-character alpha-numeric key from UKG Pro > MENU > SYSTEM CONFIGURATION
                                  > Security > Service Account Administration or Web Services.
  -e, --baseEndpointUrl=<option>  (required) Base endpoint URL from UKG Pro > MENU > SYSTEM CONFIGURATION > Security >
                                  Web Services. Do not include the protocol (https://).
                                  <options: servicet.ultipro.com|service2.ultipro.com|service3.ultipro.ca|service4.ultip
                                  ro.com|service5.ultipro.com|rental2.ultipro.com|rental3.ultipro.ca|rental4.ultipro.com
                                  |rental5.ultipro.com>
  -h, --help                      Show CLI help.
  -l, --printCreds                Print the credentials. Useful when ensuring flag input is processed correctly. As a
                                  best practice, credentials should be surrounded in double-quotes and any special
                                  characters for your conssole escaped. (Ex: ! should be \! in bash.)
  -p, --password=<value>          (required) Password for the provided username. Be sure to escape any special
                                  characters for your command line. (Ex: ! should be \! in bash shells.)
  -u, --username=<value>          (required) Username of user or service account. Employee User is required for pulling
                                  UKG Time Management data.
  -v, --verbose                   Output raw request/response combination for failing requests.

DESCRIPTION
  Pull data from a BI report through Reports as a Service (RAAS).

EXAMPLES
  $ node-raas pull "i22500177CDE54018AC31713BEBE2F644" -u ServiceAccount -p "u(3Unv0ERjlaksdjf*jfa89wfjklj23j!@3j423j#OI@^j2342" -c B5JLX -a BB7VDK0000K0 -e rental4.ultipro.com

  $ node-raas pull "/content/folder[@name='zzzCompany Folders']/folder[@name='Eastwood Industries - Master SC(72)']/folder[@name='UltiPro']/folder[@name='Customs']/report[@name='Audit Report 2']" -u ServiceAccount -p "u(3Unv0ERjlaksdjf*jfa89wfjklj23j!@3j423j#OI@^j2342" -c B5JLX -a BB7VDK0000K0 -e rental4.ultipro.com
```

_See code: [dist/commands/pull.ts](https://github.com/petarmihaylov/node-raas/blob/v0.0.20/dist/commands/pull.ts)_

## `node-raas ubirr`

Displays information about Ubirr - a production-ready, feature-rich set of tools built on top of node-raas.

```
USAGE
  $ node-raas ubirr

DESCRIPTION
  Displays information about Ubirr - a production-ready, feature-rich set of tools built on top of node-raas.
```

_See code: [dist/commands/ubirr.ts](https://github.com/petarmihaylov/node-raas/blob/v0.0.20/dist/commands/ubirr.ts)_

## `node-raas update [CHANNEL]`

update the node-raas CLI

```
USAGE
  $ node-raas update [CHANNEL] [-a] [-v <value> | -i] [--force]

FLAGS
  -a, --available        Install a specific version.
  -i, --interactive      Interactively select version to install. This is ignored if a channel is provided.
  -v, --version=<value>  Install a specific version.
  --force                Force a re-download of the requested version.

DESCRIPTION
  update the node-raas CLI

EXAMPLES
  Update to the stable channel:

    $ node-raas update stable

  Update to a specific version:

    $ node-raas update --version 1.0.0

  Interactively select version:

    $ node-raas update --interactive

  See available versions:

    $ node-raas update --available
```

_See code: [@oclif/plugin-update](https://github.com/oclif/plugin-update/blob/v3.0.0/src/commands/update.ts)_
<!-- commandsstop -->

# Use as a Library

```typescript
import {
  config as nodeRaasConfig,
  RaasCredential,
  logOnAction,
  getReportParametersAction,
  executeReportAction,
  retrieveReportAction,
  logOffAction,
  decodeStream,
  saveStream,
  FileExportExtensions,
} from '@petarmihaylov/node-raas';

(async () => {
  const nodeRaasClients = await nodeRaasConfig('servicet.ultipro.com');
  const creds: RaasCredential = {
    UserName: 'service01',
    Password: '6Fm.fW9F3KZBEvQ+vS;n*IXlW',
    ClientAccessKey: 'V5JLA',
    UserAccessKey: 'BB4VDK0000K0',
  };
  const reportId =
    "/content/folder[@name='UltiPro Sample Reports']/folder[@name='Sample Reports']/folder[@name='Human Resources Reports']/report[@name='Active Employee Listing']";
  const logonResult = await logOnAction(nodeRaasClients, creds);
  const getReportParameters = await getReportParametersAction(
    nodeRaasClients,
    logonResult,
    reportId,
  );
  console.log(getReportParameters);
  const executeReportResult = await executeReportAction(
    nodeRaasClients,
    logonResult,
    reportId,
  );
  const retrieveReportResult = await retrieveReportAction(
    nodeRaasClients,
    executeReportResult,
  );

  if (!retrieveReportResult.hasErrors) {
    const reportStream = retrieveReportResult.result[0].ReportStream;
    const decodedStream = decodeStream(reportStream);
    await saveStream(decodedStream, 'report', FileExportExtensions.XML);
  }
  await logOffAction(nodeRaasClients, logonResult);
})();
```

# Support for ENV variables and .env File

`node-raas` supports environmental variables. These can be set in an `.env` file placed alongside the `node-raas` executable, defined inline before calling `node-raas` or through a nother method - as long as they are available in your environment before `node-raas` is called.

`node-raas` uses the [dotenv](https://www.npmjs.com/package/dotenv) package with the default options. This means that if any of the variables in your `.env` file already exist in your environment, they will **not** be overridden. In such instances, you can call `node-rass` with the appropriate flags as they take precedence over Environmental Variable values.
