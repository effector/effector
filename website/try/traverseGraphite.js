//@flow

export function traverseGraphite(e) {
  if (!('group' in e)) return {type: 'noop'}
  if (e.group === 'cmd') {
    return {
      type: e.type,
      group: e.group,
      data: e.data,
    }
  }
  switch (e.type) {
    case 'seq':
    case 'multi':
      return {
        type: e.type,
        group: e.group,
        child: e.data.map(traverseGraphite),
      }
    case 'single':
    default:
      return {
        type: e.type,
        group: e.group,
        child: traverseGraphite(e.data),
      }
  }
}
