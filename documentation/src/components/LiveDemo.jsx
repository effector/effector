import {Sandpack} from '@codesandbox/sandpack-react'

const customSetup = {
  dependencies: {
    effector: 'latest'
  },
}

export default function LiveDemo({demoFile, layout = 'console'}) {
  const files = {
    '/index.js': demoFile,
  }

  return (
    <Sandpack
      template="vanilla"
      theme="auto"
      files={files}
      customSetup={customSetup}
      options={{layout}}
    />
  )
}
