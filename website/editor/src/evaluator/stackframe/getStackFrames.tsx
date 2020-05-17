import {StackFrame} from './stack-frame'
import {parse} from './parser'
import {map} from './mapper'
import {unmap} from './unmapper'

function getStackFrames(
  error: Error,
  unhandledRejection: boolean = false,
  contextSize: number = 3,
): Promise<StackFrame[]> {
  const parsedFrames = parse(error)
  let enhancedFramesPromise
  //$off
  if (error.__unmap_source) {
    enhancedFramesPromise = unmap(
      //$off
      error.__unmap_source,
      parsedFrames,
      contextSize,
    )
  } else {
    enhancedFramesPromise = map(parsedFrames, contextSize)
  }
  return enhancedFramesPromise.then(enhancedFrames => {
    if (
      enhancedFrames
        .map(f => f._originalFileName)
        .filter(f => f != null && f.indexOf('node_modules') === -1).length === 0
    ) {
      return []
    }
    return enhancedFrames.filter(
      ({functionName}) =>
        functionName == null ||
        functionName.indexOf('__stack_frame_overlay_proxy_console__') === -1,
    )
  })
}

export default getStackFrames
export {getStackFrames}
