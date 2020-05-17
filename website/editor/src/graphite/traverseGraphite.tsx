import {Cmd} from './index.h'

type NoopCmd =
  | Cmd
  | {
      type: 'noop',
    }

function traverseCmd(cmd: Cmd): NoopCmd {
  switch (cmd.type) {
    case 'barrier':
      return {
        id: cmd.id,
        type: cmd.type,
        group: cmd.group,
        data: cmd.data,
      }
    case 'update':
      return {
        id: cmd.id,
        type: cmd.type,
        group: cmd.group,
        data: cmd.data,
      }
    case 'run':
      return {
        id: cmd.id,
        type: cmd.type,
        group: cmd.group,
        data: cmd.data,
      }
    case 'filter':
      return {
        id: cmd.id,
        type: cmd.type,
        group: cmd.group,
        data: cmd.data,
      }
    case 'emit':
      return {
        id: cmd.id,
        type: cmd.type,
        group: cmd.group,
        data: cmd.data,
      }
    case 'compute':
      return {
        id: cmd.id,
        type: cmd.type,
        group: cmd.group,
        data: cmd.data,
      }
    case 'tap':
      return {
        id: cmd.id,
        type: cmd.type,
        group: cmd.group,
        data: cmd.data,
      }
    default:
      return {type: 'noop'}
  }
}

export function traverseGraphite(
  e: Array<Cmd> | Cmd,
): Array<NoopCmd> | NoopCmd {
  if (Array.isArray(e)) return e.map(traverseCmd)
  return traverseCmd(e)
}
