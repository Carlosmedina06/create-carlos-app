import { readFile, writeFile } from 'node:fs/promises'

import { glob } from 'glob'
async function replaceTokens(destination: string, projectName: string) {
  const files = await glob(`**/*`, { nodir: true, cwd: destination, absolute: true })

  for await (const file of files) {
    const data = await readFile(file, 'utf8')
    const draft = data.replace(/{{name}}/g, projectName)

    await writeFile(file, draft, 'utf8')
  }
}

export default replaceTokens
