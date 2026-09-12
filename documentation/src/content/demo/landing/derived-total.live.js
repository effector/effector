import { createStore, createEvent, combine } from "effector";

const quantityChanged = createEvent();

const $price = createStore(4.5);
const $quantity = createStore(1).on(quantityChanged, (_, value) => value);

// $total recalculates automatically whenever $price or $quantity changes —
// there is nothing to keep in sync by hand
const $total = combine($quantity, $price, (quantity, price) => (quantity * price).toFixed(2));

$total.watch((total) => {
  document.getElementById("total").textContent = `$${total}`;
});

document.getElementById("quantity").addEventListener("input", (event) => {
  quantityChanged(Number(event.target.value) || 0);
});
