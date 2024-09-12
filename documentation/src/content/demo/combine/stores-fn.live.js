import { createStore, combine } from "effector";

const $balance = createStore(0);
const $username = createStore("zerobias");

const $greeting = combine($balance, $username, (balance, username) => {
  return `Hello, ${username}. Your balance is ${balance}`;
});

$greeting.watch((data) => console.log(data)); // => Hello, zerobias. Your balance is 0

const $arrStores = combine([$balance, $username]);
$arrStores.watch(console.log); // => [0, 'zerobias']
