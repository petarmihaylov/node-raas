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
$ npm install -g node-raas
$ node-raas COMMAND
running command...
$ node-raas (-v|--version|version)
node-raas/0.0.0 linux-x64 node-v16.13.0
$ node-raas --help [COMMAND]
USAGE
  $ node-raas COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`node-raas hello [FILE]`](#node-raas-hello-file)
* [`node-raas help [COMMAND]`](#node-raas-help-command)

## `node-raas hello [FILE]`

describe the command here

```
USAGE
  $ node-raas hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ node-raas hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/petarmihaylov/node-raas/blob/v0.0.0/src/commands/hello.ts)_

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
<!-- commandsstop -->
