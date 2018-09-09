//@flow

import {createEvent} from "effector";

export const changeField = createEvent("change field");
export const resetField = createEvent("reset field");
export const addTodo = createEvent("add todo");
export const deleteTodo = createEvent("delete todo");
