import { createStore, combine } from "effector";

const $a = createStore("a");
const b = 2;
const c = [false];
const d = { value: 1 };

const $resultUsingComa = combine($a, b, c, d);
const $resultUsingArray = combine([$a, b, c, d]);
const $resultUsingObject = combine({ $a, b, c, d });

const $withFn = combine($a, b, c, d, (a, b) => ({ a, b }));

$resultUsingComa.watch(console.log); // => ["a", 2, [false], {value: 1}]
$resultUsingArray.watch(console.log); // => ["a", 2, [false], {value: 1}]
$resultUsingObject.watch(console.log); // => {$a: "a", b: 2, c: [false], d: {value: 1}}
$withFn.watch(console.log); // => {a: "a", b: 2}

// will not trigger combine, but object and array will be changed because of reference
// uncomment the code below to see changes
// c.push(true)
// d.value = 2
