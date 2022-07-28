import {readTemplate} from './region'
import type {Template, TemplateHandlers} from '../forest/index.h'

export function applyTemplate<K extends keyof TemplateHandlers>(
  method: K,
  ...args: Parameters<TemplateHandlers[K]> extends [Template, ...infer Args]
    ? Args
    : never
): ReturnType<TemplateHandlers[K]> | void {
  const template = readTemplate()
  if (template) {
    const fn = template.handlers[method]
    // @ts-expect-error
    if (fn) return fn(template, ...args)
  }
}
