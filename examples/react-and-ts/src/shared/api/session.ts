import { createEffect } from "effector";
import { createOid } from "shared/lib/oid";
import { wait } from "shared/lib/wait";
import { uniqueNamesGenerator, Config, starWars } from "unique-names-generator";

const nameGenerator: Config = { dictionaries: [starWars] };
const createName = () => uniqueNamesGenerator(nameGenerator);

// It is called session because it describes current user session, not the User at all.
export interface Session {
  id: string;
  name: string;
}

const LocalStorageKey = "effector-example-session";

// We need explicitly return `null` because `undefined` is a special value in the effector ecosystem,
// that defines some "empty" state, and store will skip updates if we try to pass `undefined` inside.
// Always use `null` for "no value state".
// Note, that we need explicit types definition in that case, because `JSON.parse()` returns `any`
export const sessionLoadFx = createEffect<void, Session | null>(async () => {
  const source = localStorage.getItem(LocalStorageKey);
  await wait();
  if (!source) {
    return null;
  }
  return JSON.parse(source);
});

// By default if no aruments, no explicit type arguments, and no return,
// effect will have type: `Effect<void, void, Error>`
export const sessionDeleteFx = createEffect(async () => {
  localStorage.removeItem(LocalStorageKey);
  await wait();
});

// Look at the type of the `sessionCreateFx` constant.
// It will be `Effect<void, Session, Error>` because Typescript can infer type from `session` constant
export const sessionCreateFx = createEffect(async () => {
  // I explicitly set type for the next constant, because it allows Typescript help me
  // If I forgot to set property, I'll see error in the place of definition
  // Also it allows IDE to autocomplete property names
  const session: Session = {
    id: createOid(),
    name: createName(),
  };
  localStorage.setItem(LocalStorageKey, JSON.stringify(session));
  return session;
});
