import chalk from 'chalk'
import * as fs from 'node:fs'

export enum FileExportExtensions {
  XML = 'xml'
}

export function blueMagenta(blueString: string, magentaString: string) {
  return `${chalk.blue(blueString)} ${chalk.magenta(magentaString)}`
}

export function decodeStream(reportStream: string) {
  return Buffer.from(reportStream, 'base64').toString('utf-8')
}

export async function saveStream(decodedStream: string, fileName: string, fileExtension: FileExportExtensions) {
  // Create a writable stream
  const fileLocation = `${fileName}.${fileExtension}`
  const writerStream = fs.createWriteStream(fileLocation)
  // Write the data to stream with encoding to be utf8
  await writerStream.write(decodedStream, 'utf8')
  // Mark the end of file
  writerStream.end()

  // Handle stream events --> finish, and error
  writerStream.on('finish', () => console.log(`Report stream saved to ${fileLocation}`))

  writerStream.on('error', function (err: any) {
    throw new Error(err.stack)
  })
}
