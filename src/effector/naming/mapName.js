//@flow

export const joinName = (unit: any, tag: string) => '' + unit.shortName + tag

export const mapName = (unit: any, name: ?string) =>
  name == null ? joinName(unit, ' → *') : name
