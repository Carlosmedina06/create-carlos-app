import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

interface Arguments {
  _: string[]
  [key: string]: unknown
}

async function getArguments(): Promise<Arguments> {
  const args = await yargs(hideBin(process.argv)).options({
    name: {
      alias: 'n',
      type: 'string',
      description: 'Name of the project',
    },
    template: {
      alias: 't',
      type: 'string',
      description: 'Template to use',
    },
  }).argv

  const overriddenArgs = { ...args }

  return overriddenArgs as Arguments
}

export default getArguments
