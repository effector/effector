//@flow

export const mapName = (unit: any, name: ?string) =>
  name == null ? '' + unit.shortName + ' → *' : name
