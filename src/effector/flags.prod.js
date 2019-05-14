//@flow

export const __DEBUG__ = false
export const __DEV__ = process.env.NODE_ENV !== 'production'
export const __CANARY__ = false

export {version} from '../packages/effector/package.json'
