import { cp } from 'node:fs/promises'
import path from 'node:path'

async function copyFiles(template: string, destination: string) {
  await cp(path.join(template, 'project'), destination, { recursive: true })
}

export default copyFiles
