//@flow

const printFull = (full, tag = '') => {
  const items = full.map(e => `${e.type} ${e.id}`)
  const itemsText = items.join(', ')
  console.log(`${tag} [${itemsText}]`)
}

export default {
  box: [],
  item: [],
  full: [],
  pushItem(item: *) {
    this.item.push(item)
    this.full.push(item)
    dev: {
      // printFull(this.full)
      // printFull(this.item, '(cmd)')
    }
  },
  popItem() {
    this.item.pop()
    this.full.pop()
    dev: {
      // printFull(this.full)
      // printFull(this.item, '(cmd)')
    }
  },
  pushBox(box: *) {
    this.box.push(box)
    this.full.push(box)
    dev: {
      // printFull(this.full)
      // printFull(this.box, '(box)')
    }
  },
  popBox() {
    this.box.pop()
    this.full.pop()
    dev: {
      // printFull(this.full)
      // printFull(this.box, '(box)')
    }
  },
}
