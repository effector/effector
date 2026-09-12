import { createStore, createEffect } from "effector";

// Wrap any async function in an effect and get .pending, .done and .fail for free —
// no manual isLoading flags, no try/catch scattered around
const loadUserFx = createEffect(async () => {
  await new Promise((resolve) => setTimeout(resolve, 900));
  return { name: "Ada Lovelace", role: "Mathematician" };
});

const $user = createStore(null).on(loadUserFx.doneData, (_, user) => user);

loadUserFx.pending.watch((pending) => {
  document.getElementById("load").disabled = pending;
  document.getElementById("status").textContent = pending ? "Loading…" : "Ready";
});

$user.watch((user) => {
  if (!user) return;
  document.getElementById("name").textContent = user.name;
  document.getElementById("role").textContent = user.role;
});

document.getElementById("load").addEventListener("click", () => loadUserFx());
