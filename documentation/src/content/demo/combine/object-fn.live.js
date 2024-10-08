import { createStore, combine } from "effector";

const $r = createStore(255);
const $g = createStore(0);
const $b = createStore(255);

const $sum = combine({ r: $r, g: $g, b: $b }, ({ r, g, b }) => r + g + b);
$sum.watch(console.log); // => 510
