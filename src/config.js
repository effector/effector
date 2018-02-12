//@flow

export type Config = {
  plain: Map<string, (payload: any) => any>,
}

export const PING = '@@effector/ping'
export const PONG = '@@effector/pong'

