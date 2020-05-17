export type FlowErrorKind =
  | 'infer'
  | 'parse'
  | 'internal'
  | 'duplicate provider'
  | 'recursion limit exceeded'
  | 'lint'

export type FlowErrorSeverity = 'off' | 'error' | 'warning'

export type FlowLocation = {
  source: string | null,
  type:
    | 'LibFile'
    | 'SourceFile'
    | 'ResourceFile'
    | 'JsonFile'
    | 'Builtins'
    | null,
  start: {
    line: number,
    column: number,
    offset?: number,
  },
  end: {
    line: number,
    column: number,
    offset?: number,
  },
}

export type FlowInfoTree = {
  message: Array<FlowMessage>,
  children?: Array<FlowInfoTree>,
}

export type FlowMessage = {
  context: string | null,
  descr: string,
  type: 'Blame' | 'Comment',
  loc?: FlowLocation,
  path: string,
  line: number,
  endline: number,
  start: number,
  end: number,
}

export type FlowError = {
  kind: FlowErrorKind,
  level: FlowErrorSeverity,
  suppressions: Array<{loc: FlowLocation}>,

  extra?: Array<FlowInfoTree>,
  message: Array<FlowMessage>,
}
