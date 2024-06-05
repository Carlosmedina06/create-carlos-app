import path from 'node:path'
import { fileURLToPath } from 'node:url'

import color from 'picocolors'

import getArguments from './utils/helpers/getArguments'
import getProjectInfo from './utils/helpers/getProjectInfo'
import copyFiles from './utils/helpers/copyFiles'
import replaceTokens from './utils/helpers/replaceTokens'

async function main() {
  const args = await getArguments()
  const initialName = args._[0]
  const initialProject = args._[1]

  const project = await getProjectInfo(initialName, initialProject)

  if (!project.name || !project.template || !project.template.length) {
    console.log('\n 🚨 Exiting... ')
    process.exit(1) // eslint-disable-line
  }

  const template = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    'templates',
    project.template,
  )
  const destination = path.join(process.cwd(), project.name)

  await copyFiles(template, destination)
  await replaceTokens(destination, project.name)

  console.log('\n✨ Project created ✨')
  console.log(`\n${color.yellow(`Next steps:`)}\n`)
  console.log(`${color.green(`cd`)} ${project.name}`)
  console.log(`${color.green(`npm`)} install`)
  console.log(`${color.green(`npm`)} dev`)

  console.log('\n---\n')
  console.log(
    `Questions 👀? ${color.underline(color.cyan('https://www.linkedin.com/in/carlosmedina06/'))}`,
  )
}

main().catch((error) => {
  console.error('\n🚨 An error occurred: ', error)
  process.exit(1) // eslint-disable-line
})
