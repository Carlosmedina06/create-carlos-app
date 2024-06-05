import prompts from 'prompts'

import TEMPLATES from '../constants/templates'

async function getProjectInfo(initialName: string | undefined, initialProject: string | undefined) {
  return prompts([
    {
      type: 'text',
      name: 'name',
      message: 'What is the name of your project?',
      initial: initialName || 'medina-project-name',
      validate: (value: string) => {
        if (value.match(/[^a-zA-Z0-9-_]+/g))
          return 'Project name can only contain letters, numbers, dashes and underscores'

        return true
      },
    },
    {
      type: 'select',
      name: 'template',
      message: `Which template would you like to use?`,
      initial: initialProject || 0,
      choices: TEMPLATES,
    },
  ])
}

export default getProjectInfo
