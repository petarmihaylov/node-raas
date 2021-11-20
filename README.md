node-raas
=========

A tiny library and CLI for interacting with the Reports as a Service (RAAS) API from UKG (Ultimate Kronos Group) to pull reports without parameters. NOTE: Not published nor supported by UKG.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/node-raas.svg)](https://npmjs.org/package/node-raas)
[![CircleCI](https://circleci.com/gh/petarmihaylov/node-raas/tree/master.svg?style=shield)](https://circleci.com/gh/petarmihaylov/node-raas/tree/master)
[![Downloads/week](https://img.shields.io/npm/dw/node-raas.svg)](https://npmjs.org/package/node-raas)
[![License](https://img.shields.io/npm/l/node-raas.svg)](https://github.com/petarmihaylov/node-raas/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @petarmihaylov/node-raas
$ node-raas COMMAND
running command...
$ node-raas (-v|--version|version)
@petarmihaylov/node-raas/0.0.1 linux-x64 node-v16.13.0
$ node-raas --help [COMMAND]
USAGE
  $ node-raas COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`node-raas console`](#node-raas-console)
* [`node-raas help [COMMAND]`](#node-raas-help-command)
* [`node-raas pull REPORTPATHORID`](#node-raas-pull-reportpathorid)
* [`node-raas raastastic`](#node-raas-raastastic)

## `node-raas console`

Quickly test reports and access with this interactive console pulling data from a BI report through Reports as a Service (RAAS).

```
USAGE
  $ node-raas console

OPTIONS
  -a, --userApiKey=userApiKey
      A 12-character alpha-numeric key for the provided username from UKG Pro > MENU > SYSTEM CONFIGURATION > Security >
      Service Account Administration.

  -c, --customerApiKey=customerApiKey
      A 5-character alpha-numeric key from UKG Pro > MENU > SYSTEM CONFIGURATION > Security > Service Account
      Administration.

  -e,
  --baseEndpointUrl=servicet.ultipro.com|service2.ultipro.com|service3.ultipro.ca|service4.ultipro.com|service5.ultipro.
  com|rental2.ultipro.com|rental3.ultipro.ca|rental4.ultipro.com|rental5.ultipro.com
      Base endpoint URL from UKG Pro > MENU > SYSTEM CONFIGURATION > Security > Web Services. Do not include the protocol
      (https://).

  -h, --help
      show CLI help

  -p, --password=password
      Password for the provided username.

  -u, --username=username
      Username of user or service account. Employee user is required for pulling UKG Time Management data.

  -v, --verbose
      Output raw request/response combination for failing requests.

  --console

EXAMPLES
  $ node-raas console
  $ node-raas console -e rental4.ultipro.com
```

_See code: [src/commands/console.ts](https://github.com/petarmihaylov/node-raas/blob/v0.0.1/src/commands/console.ts)_

## `node-raas help [COMMAND]`

display help for node-raas

```
USAGE
  $ node-raas help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.4/src/commands/help.ts)_

## `node-raas pull REPORTPATHORID`

Pull data from a BI report through Reports as a Service (RAAS).

```
USAGE
  $ node-raas pull REPORTPATHORID

ARGUMENTS
  REPORTPATHORID  Report path or ID from Cognos (BI). Obtained by inspecting Properties of a BI report. (Right-click >
                  Properties > General > Advanced > [Search path | ID].)

OPTIONS
  -a, --userApiKey=userApiKey
      (required) A 12-character alpha-numeric key for the provided username from UKG Pro > MENU > SYSTEM CONFIGURATION >
      Security > Service Account Administration.

  -c, --customerApiKey=customerApiKey
      (required) A 5-character alpha-numeric key from UKG Pro > MENU > SYSTEM CONFIGURATION > Security > Service Account
      Administration.

  -e,
  --baseEndpointUrl=servicet.ultipro.com|service2.ultipro.com|service3.ultipro.ca|service4.ultipro.com|service5.ultipro.
  com|rental2.ultipro.com|rental3.ultipro.ca|rental4.ultipro.com|rental5.ultipro.com
      (required) Base endpoint URL from UKG Pro > MENU > SYSTEM CONFIGURATION > Security > Web Services. Do not include
      the protocol (https://).

  -h, --help
      show CLI help

  -l, --printCreds
      Print the credentials. Useful when ensuring flag input is processed correctly. As a best practice, credentials
      should be surrounded in double-quotes.

  -p, --password=password
      (required) Password for the provided username.

  -u, --username=username
      (required) Username of user or service account. User is required for pulling UKG Time Management data.

  -v, --verbose
      Output raw request/response combination for failing requests.

EXAMPLES
  $ node-raas pull "i22500177CDE54018AC31713BEBE2F644" -u ServiceAccount -p
  "u(3Unv0ERjlaksdjf*jfa89wfjklj23j!@3j423j#OI@^j2342" -c B5JLX -a BB7VDK0000K0 -e rental4.ultipro.com
  $ node-raas pull "/content/folder[@name='zzzCompany Folders']/folder[@name='Eastwood Industries - Master
  SC(72)']/folder[@name='UltiPro']/folder[@name='Customs']/report[@name='Audit Report 2']" -u ServiceAccount -p
  "u(3Unv0ERjlaksdjf*jfa89wfjklj23j!@3j423j#OI@^j2342" -c B5JLX -a BB7VDK0000K0 -e rental4.ultipro.com
```

_See code: [src/commands/pull.ts](https://github.com/petarmihaylov/node-raas/blob/v0.0.1/src/commands/pull.ts)_

## `node-raas raastastic`

Displays information about RaasTastic - a production-ready, feature-rich set of tools built on top of node-raas.

```
USAGE
  $ node-raas raastastic
```

_See code: [src/commands/raastastic.ts](https://github.com/petarmihaylov/node-raas/blob/v0.0.1/src/commands/raastastic.ts)_
<!-- commandsstop -->
