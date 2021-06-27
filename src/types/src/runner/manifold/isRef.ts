import {Ref, Declarator, DataDecl, BoolDecl} from './types'

export function isRef(value: unknown): value is Ref<unknown, unknown> {
  return typeof value === 'object' && value !== null && '__t' in value
}
export function assertRef(
  value: unknown,
): asserts value is Ref<unknown, unknown> {
  if (!isRef(value)) throw Error(`value should be Ref`)
}
const declarators: Declarator['kind'][] = [
  'bool',
  'computeVariant',
  'flag',
  'fn',
  'permute',
  'raw',
  'separate',
  'union',
  'value',
]
const dataDecls: DataDecl<unknown>['kind'][] = [
  'computeVariant',
  'fn',
  'permute',
  'raw',
  'separate',
  'value',
  'union',
]
const boolDecls: BoolDecl['kind'][] = [
  'bool',
  'computeVariant',
  'flag',
  'fn',
  'raw',
  'separate',
  'union',
  'value',
]
export function isDeclarator(value: unknown): value is Declarator {
  return isRef(value) && declarators.includes(value.kind as any)
}

export function isDataDecl<T>(value: unknown): value is DataDecl<T>
export function isDataDecl(value: unknown): value is DataDecl<unknown>
export function isDataDecl(value: unknown): value is DataDecl<unknown> {
  return isRef(value) && dataDecls.includes(value.kind as any)
}

export function isBoolDecl(value: unknown): value is BoolDecl {
  return isRef(value) && boolDecls.includes(value.kind as any)
}
