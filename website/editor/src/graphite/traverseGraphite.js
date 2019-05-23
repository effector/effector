//@flow

import type {Cmd} from './index.h'

type NoopCmd =
  | Cmd
  | {|
      type: 'noop',
    |}

function traverseCmd(cmd: Cmd): NoopCmd {
  switch (cmd.type) {
    case 'barrier':
      return {
        id: cmd.id,
        type: (cmd.type: 'barrier'),
        group: cmd.group,
        data: cmd.data,
      }
    case 'update':
      return {
        id: cmd.id,
        type: (cmd.type: 'update'),
        group: cmd.group,
        data: cmd.data,
      }
    case 'run':
      return {
        id: cmd.id,
        type: (cmd.type: 'run'),
        group: cmd.group,
        data: cmd.data,
      }
    case 'filter':
      return {
        id: cmd.id,
        type: (cmd.type: 'filter'),
        group: cmd.group,
        data: cmd.data,
      }
    case 'emit':
      return {
        id: cmd.id,
        type: (cmd.type: 'emit'),
        group: cmd.group,
        data: cmd.data,
      }
    case 'compute':
      return {
        id: cmd.id,
        type: (cmd.type: 'compute'),
        group: cmd.group,
        data: cmd.data,
      }
    case 'tap':
      return {
        id: cmd.id,
        type: (cmd.type: 'tap'),
        group: cmd.group,
        data: cmd.data,
      }
    default:
      /*::;(cmd.type: empty)*/
      return {type: 'noop'}
  }
}

export function traverseGraphite(
  e: Array<Cmd> | Cmd,
): Array<NoopCmd> | NoopCmd {
  if (Array.isArray(e)) return e.map<NoopCmd>(traverseCmd)
  return traverseCmd(e)
}
