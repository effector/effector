import type {ExpressionStatement} from '@babel/types'
import type {NodePath} from '@babel/traverse'
import type {
  CreateHMRRegionTemplate,
  FactoryTemplate,
  WithRegionTemplate,
  HotCodeSyntaxTemplate,
  HotCodeTemplate,
  ImportNamesMap,
} from './types'
import {addImport, REGION_NAME} from './util'

export function createFactoryTemplate(
  template: typeof import('@babel/core')['template'],
  addLoc: boolean,
  addNames: boolean,
): FactoryTemplate {
  let factoryTemplate: FactoryTemplate | null = null
  return args => {
    if (!factoryTemplate) {
      factoryTemplate = template(
        addLoc
          ? 'FACTORY({sid: SID,fn:()=>FN,name:NAME,method:METHOD,loc:LOC})'
          : addNames
          ? 'FACTORY({sid: SID,fn:()=>FN,name:NAME,method:METHOD})'
          : 'FACTORY({sid: SID,fn:()=>FN})',
      ) as any as FactoryTemplate
    }
    return factoryTemplate(args)
  }
}

export function createWithRegionTemplate(
  template: typeof import('@babel/core')['template'],
): WithRegionTemplate {
  let withRegionTemplate: WithRegionTemplate | null = null
  return args => {
    if (!withRegionTemplate) {
      withRegionTemplate = template(
        'WITH_REGION(REGION_NAME, () => FN)',
      ) as any as WithRegionTemplate
    }
    return withRegionTemplate(args)
  }
}

export function createHMRRegionTemplate(
  template: typeof import('@babel/core')['template'],
): CreateHMRRegionTemplate {
  let hmrRegionTemplate: CreateHMRRegionTemplate | null = null
  return args => {
    if (!hmrRegionTemplate) {
      hmrRegionTemplate = template(
        'const REGION_NAME = CREATE_NODE({regional: true})',
      ) as any as CreateHMRRegionTemplate
    }
    return hmrRegionTemplate(args)
  }
}

export function createHotCodeTemplate(
  template: typeof import('@babel/core')['template'],
  t: typeof import('@babel/types'),
): HotCodeTemplate {
  let hotProperty: ExpressionStatement
  let hotCodeTemplate: HotCodeSyntaxTemplate | null = null
  return (importNamesMap, declaration, hmrMode) => {
    if (!hotProperty) {
      hotProperty = template.expression.ast(
        hmrMode === 'cjs'
          ? 'module.hot'
          : '(import.meta.hot || import.meta.webpackHot)',
      ) as any as ExpressionStatement
    }
    if (!hotCodeTemplate) {
      hotCodeTemplate = template(`
        if (HOT_PROPERTY) {
          HOT_PROPERTY.dispose(() => CLEAR_NODE(REGION_NAME));
        } else {
          console.warn('[effector hmr] HMR is not available in current environment.');
        }
      `) as any as HotCodeSyntaxTemplate
    }
    return hotCodeTemplate({
      HOT_PROPERTY: hotProperty,
      CLEAR_NODE: addImport(t, declaration, 'clearNode', importNamesMap),
      REGION_NAME,
    })
  }
}
