import { blue, green, magenta } from "chalk";
import { Clients, login, RaasCredential, RaasLogOnCallResult } from "./core-raas";
import { handleBiDataServiceErrors } from "./error";
import { blueMagenta } from "./utils/formatters";
import cli from 'cli-ux'

export async function loginAction(clients: Clients, raasCredential: RaasCredential, flags: any): Promise<RaasLogOnCallResult> {
  // Login - Start
  cli.action.start(blue('LogOn'));
  const startTimeLogOn = Date.now();
  const logOnResult: RaasLogOnCallResult = await login(clients, raasCredential);
  if (logOnResult.hasErrors) {
    handleBiDataServiceErrors(logOnResult, 'LogOnResult', flags.verbose);
  }
  const msElapsedLogOn = Date.now() - startTimeLogOn;
  // this.log(`${blue(`LogOn:`)} ${green(`Success`)} | ${blue(`US-CORRELATION-ID:`)} ${magenta(logOnResult.correlationId)}`)
  cli.action.stop(`${green(`Success`)} | ${blue(`US-CORRELATION-ID:`)} ${magenta(logOnResult.correlationId)} | ${blueMagenta(`Took:`, `${msElapsedLogOn / 1000}s`)}`)
  // Login - End
  return logOnResult
}