import { blue, magenta } from "chalk";

export function blueMagenta(blueString: string, magentaString: string) {
  return `${blue(blueString)} ${magenta(magentaString)}`
}