//@flow

export type CompositeName = {
  +shortName: string,
  +fullName: string,
  +path: Array<string>,
}

function Name(shortName: string, fullName: string, path: Array<string>) {
  this.shortName = shortName
  this.fullName = fullName
  this.path = path
}

export function createName(name: string, parent?: CompositeName) {
  let path
  let fullName
  const shortName = name
  if (parent === undefined) {
    if (name.length === 0) {
      path = ([]: string[])
    } else {
      path = [name]
    }
    fullName = name
  } else {
    if (name.length === 0) {
      path = parent.path
      fullName = parent.fullName
    } else {
      path = parent.path.concat([name])
      if (parent.fullName.length === 0) {
        fullName = name
      } else {
        fullName = '' + parent.fullName + '/' + name
      }
    }
  }
  return new Name(shortName, fullName, path)
}
