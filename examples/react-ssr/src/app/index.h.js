//@flow

export type ID = number
export type TodoStatus = 'active' | 'completed'
export type ShowFilter = 'active' | 'completed' | 'all'

export type TodoItem = {
 id: ID,
 text: string,
 date: Date,
}
export type TodoList = TodoItem[]

export type PersistData = {
 todos: TodoItem[],
 itemList: {
  order: ID[],
  status: [ID, TodoStatus][],
  visible: [ID, boolean][],
  selected: ID | null,
 },
 nextID: ID,
 filterStatus: ShowFilter,
}
