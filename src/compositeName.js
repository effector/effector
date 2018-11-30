//@flow

export class CompositeName {
  /*::
 +path: Array<string>;
 +shortName: string;
 +fullName: string;
 */
  constructor(name: string, parentPath: Array<string>) {
    const path = parentPath.concat(name === '' ? [] : [name])
    this.shortName = name
    this.path = path
    this.fullName = path.join('/')
  }
}

export function createName(name: string, parent?: CompositeName) {
  return new CompositeName(name, parent === undefined ? [] : parent.path)
}
