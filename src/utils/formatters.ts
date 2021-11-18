import { blue, magenta } from "chalk";

export function blueMagenta(blueString: string, magentaString: string) {
  return `${blue(blueString)} ${magenta(magentaString)}`
}

export function decodeStream(reportStream: string) {
  return Buffer.from(reportStream).toString('utf-8')
}