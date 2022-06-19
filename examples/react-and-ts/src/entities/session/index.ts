import { Session } from "shared/api";
import { createStore } from "effector";

// When store `$session` is updated, store `$isLogged` will be updated too
// They are in sync. Derived store are depends on data from original.
export const $session = createStore<Session | null>(null);
export const $isLogged = $session.map((session) => session !== null);
