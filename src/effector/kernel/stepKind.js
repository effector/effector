//@flow

export type StepKind = {|
  +tag: string,
  +from: StepKind[],
  +to: StepKind[],
|}
export function stepKind(
  tag: string,
  {from = [], to = []}: {from?: StepKind[], to?: StepKind[]} = {},
): StepKind {
  return {tag, from, to}
}
