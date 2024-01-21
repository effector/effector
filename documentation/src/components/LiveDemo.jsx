import {Sandpack} from '@codesandbox/sandpack-react'

const customSetup = {
  dependencies: {
    effector: 'latest'
  },
}

const options = {
  showConsole: true,
}

export default function LiveDemo({demoFile}) {
  const files = {
    '/index.js': demoFile,
  }

  return (
    <Sandpack
      template="vanilla"
      theme="auto"
      files={files}
      customSetup={customSetup}
      options={options}
    />
  )
}
