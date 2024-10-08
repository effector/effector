import { createStore, combine } from "effector";

const $r = createStore(255);
const $g = createStore(0);
const $b = createStore(255);

const $color = combine([$r, $g, $b]);
$color.watch(console.log); // => [255, 0, 255]
