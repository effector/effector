---
title: AsyncStorage Counter on React Native
redirectFrom:
  - /docs/recipes/react-native/asyncstorage-counter
  - /recipes/react-native/asyncstorage-counter
---

The following example is a React Native counter that stores data to AsyncStorage. It uses store, events and effects.

```js
import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import { createStore, createEvent, createEffect, sample } from "effector";
import { useUnit } from "effector-react";

const init = createEvent();
const increment = createEvent();
const decrement = createEvent();
const reset = createEvent();

const fetchCountFromAsyncStorageFx = createEffect(async () => {
  const value = parseInt(await AsyncStorage.getItem("count"));
  return !isNaN(value) ? value : 0;
});

const updateCountInAsyncStorageFx = createEffect(async (count) => {
  try {
    await AsyncStorage.setItem("count", `${count}`, (err) => {
      if (err) console.error(err);
    });
  } catch (err) {
    console.error(err);
  }
});

const $counter = createStore(0);

sample({
  clock: fetchCountFromAsyncStorageFx.doneData,
  target: init,
});

$counter
  .on(init, (state, value) => value)
  .on(increment, (state) => state + 1)
  .on(decrement, (state) => state - 1)
  .reset(reset);

sample({
  clock: $counter,
  target: updateCountInAsyncStorageFx,
});

fetchCountFromAsyncStorageFx();

export default () => {
  const count = useUnit(counter);

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{count}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity key="dec" onPress={decrement} style={styles.button}>
          <Text style={styles.label}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity key="reset" onPress={reset} style={styles.button}>
          <Text style={styles.label}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity key="inc" onPress={increment} style={styles.button}>
          <Text style={styles.label}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 20,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 60,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
  },
  button: {
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#4287f5",
    borderRadius: 5,
  },
  label: {
    fontSize: 30,
    color: "#ffffff",
    fontWeight: "bold",
  },
});
```
