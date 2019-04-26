---
id: from-redux
title: From Redux
sidebar_label: From Redux
---

> Work in Progress

## Preparation

Install Redux adapter

**Prerequisite**: either NPM (comes with [node](https://nodejs.org/en/)) or [Yarn](https://yarnpkg.com/en/).

To install the stable version:

```sh
npm install --save @effector/redux-adapter
```

```sh
yarn add @effector/redux-adapter
```

## Concepts

<table>
  <thead>
    <th>Effector</th>
    <th>Redux</th>
  </thead>
  <tbody>
    <tr>
      <td>

[`Event`](../../api/effector/Event.md)

</td>
<td>

[`Action`](https://redux.js.org/basics/actions)

</td>
</tr>
<tr>
<td>

[`Effect`](../../api/effector/Effect.md)

</td>
<td>

[`Async Action`](https://redux.js.org/advanced/async-actions)

</td>
</tr>
<tr>
<td>

`Watcher`

</td>
<td>

[`Epic`](https://redux-observable.js.org/docs/basics/Epics.html)

</td>
</tr>

  </tbody>
</table>

## Migrating

Replace your `createStore` call with `createReduxStore`:

```diff
-import {createStore} from 'redux'
+import {createReduxStore} from '@effector/redux-adapter'
```
