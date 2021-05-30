# ☄️ effector

The state manager

## Visit [effector.dev](https://effector.dev) for docs, guides and examples

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Introduction](#introduction)
  - [Effector follows five basic principles:](#effector-follows-five-basic-principles)
- [Installation](#installation)
- [Documentation](#documentation)
- [Packages](#packages)
- [Articles](#articles)
- [Community](#community)
- [Online playground](#online-playground)
- [DevTools](#devtools)
- [More examples in documentation](#more-examples-in-documentation)
- [Learn more](#learn-more)
- [Support us](#support-us)
- [Contributors](#contributors)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introduction

Effector is an effective multi-store state manager for Javascript apps **(React/React Native/Vue/Node.js)**, that allows you to manage data in complex applications without the risk of inflating the monolithic central store, with clear control flow, good type support and high capacity API. Effector supports both **TypeScript** and **Flow** type annotations _out of the box_.

### Effector follows five basic principles:

- **Application stores should be as light as possible** - the idea of adding a store for specific needs should not be frightening or damaging to the developer.
- **Application stores should be freely combined** - data that the application needs can be statically distributed, showing how it will be converted in runtime.
- **Autonomy from controversial concepts** - no decorators, no need to use classes or proxies - this is not required to control the state of the application and therefore the api library uses only functions and plain js objects
- **Predictability and clarity of API** - a small number of basic principles are reused in different cases, reducing the user's workload and increasing recognition. For example, if you know how .watch works for events, you already know how .watch works for stores.
- **The application is built from simple elements** - space and way to take any required business logic out of the view, maximizing the simplicity of the components.

## Installation

```sh
npm install effector
```

**React**

```sh
npm install effector effector-react
```

**Vue**

```sh
npm install effector effector-vue
```

**Svelte**

Svelte works with effector out from a box, no additional packages needed. See [word chain](https://github.com/today-/citycatch) game application written with svelte and effector.

**CDN**

- https://unpkg.com/effector/effector.cjs.js
- https://unpkg.com/effector/effector.mjs
- https://unpkg.com/effector-react/effector-react.cjs.js
- https://unpkg.com/effector-vue/effector-vue.cjs.js

## Documentation

For additional information, guides and api reference visit [our documentation site](https://effector.dev/docs/introduction/core-concepts)

## Packages

- [effector](https://effector.dev/docs/api/effector/effector)
- [effector-react](https://effector.dev/docs/api/effector-react/effector-react)
- [effector-vue](https://effector.dev/docs/api/effector-vue/effector-vue)

## Articles

- [Why I choose Effector instead of Redux or MobX](https://dev.to/lessmess/why-i-choose-effector-instead-of-redux-or-mobx-3dl7)
- [Effector — State Manager You Should Give a Try](https://itnext.io/effector-state-manager-you-should-give-a-try-b46b917e51cc)
- [Effector vs. Vuex. Which storage management is better for VueJS app?](https://medium.com/blue-harvest-tech-blog/effector-vs-vuex-which-storage-management-is-better-for-vuejs-app-54f3c3257b53)
- [Powerful and fast state manager](https://codeburst.io/effector-state-manager-6ee2e72e8e0b)
- [Testing api calls with effects and stores](https://www.patreon.com/posts/testing-api-with-32415095)
- [Effector's beginner guide](https://dev.to/yanlobat/effector-s-beginner-guide-3jl4)

## Community

- [awesome-effector](https://github.com/effector/awesome-effector) a curated list of awesome effector packages, videos and articles
- [Twitter](https://twitter.com/effectorjs)
- [Telegram](https://t.me/effector_en) (@effector_en)
- [Telegram 🇷🇺](https://t.me/effector_ru) (@effector_ru)
- [dev.to](https://dev.to/effector)
- [Gitter](https://gitter.im/effector-js/community)
- [Discord](https://discord.gg/yHcMcuRWeC)
- Add a [GitHub Topic `effector`](https://github.com/topics/effector) to your project's home page

## Online playground

You can try effector in [our repl](https://share.effector.dev)

Code sharing, Typescript and react supported out of the box. [REPL repository](https://github.com/effector/repl)

## DevTools

Use [effector-logger](https://github.com/effector/logger) for printing updates to console, displaying current store values with ui or connecting application to familiar redux devtools

<hr />

## More examples [in documentation](https://effector.dev/docs/introduction/examples)

## Learn more

- [Glossary](https://effector.dev/docs/glossary)
- [Usage with TypeScript](https://effector.dev/docs/typescript/typing-effector)
- [API docs](https://effector.dev/en/api/effector/effector)
- [Changelog](https://changelog.effector.dev)

## Support us

More articles about effector at patreon
<a href="https://www.patreon.com/zero_bias/overview"><img src="https://c5.patreon.com/external/logo/become_a_patron_button.png"/></a>

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://zerobias.net"><img src="https://avatars0.githubusercontent.com/u/15912112?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Dmitry</b></sub></a><br /><a href="#question-zerobias" title="Answering Questions">💬</a> <a href="https://github.com/effector/effector/commits?author=zerobias" title="Code">💻</a> <a href="https://github.com/effector/effector/commits?author=zerobias" title="Documentation">📖</a> <a href="#example-zerobias" title="Examples">💡</a> <a href="#ideas-zerobias" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-zerobias" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/effector/effector/commits?author=zerobias" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/goodmind"><img src="https://avatars2.githubusercontent.com/u/3275424?v=4?s=100" width="100px;" alt=""/><br /><sub><b>andretshurotshka</b></sub></a><br /><a href="#question-goodmind" title="Answering Questions">💬</a> <a href="https://github.com/effector/effector/commits?author=goodmind" title="Code">💻</a> <a href="https://github.com/effector/effector/commits?author=goodmind" title="Documentation">📖</a> <a href="#platform-goodmind" title="Packaging/porting to new platform">📦</a> <a href="https://github.com/effector/effector/commits?author=goodmind" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://sergeysova.com"><img src="https://avatars0.githubusercontent.com/u/5620073?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sergey Sova</b></sub></a><br /><a href="https://github.com/effector/effector/commits?author=sergeysova" title="Documentation">📖</a> <a href="#example-sergeysova" title="Examples">💡</a> <a href="https://github.com/effector/effector/commits?author=sergeysova" title="Code">💻</a> <a href="https://github.com/effector/effector/commits?author=sergeysova" title="Tests">⚠️</a> <a href="#ideas-sergeysova" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://t.me/artalar"><img src="https://avatars0.githubusercontent.com/u/27290320?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Arutyunyan Artyom</b></sub></a><br /><a href="https://github.com/effector/effector/commits?author=artalar" title="Documentation">📖</a> <a href="#example-artalar" title="Examples">💡</a></td>
    <td align="center"><a href="https://github.com/Komar0ff"><img src="https://avatars2.githubusercontent.com/u/10588170?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ilya</b></sub></a><br /><a href="https://github.com/effector/effector/commits?author=Komar0ff" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/dpr-dev"><img src="https://avatars3.githubusercontent.com/u/23157659?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Arthur Irgashev</b></sub></a><br /><a href="https://github.com/effector/effector/commits?author=dpr-dev" title="Documentation">📖</a> <a href="https://github.com/effector/effector/commits?author=dpr-dev" title="Code">💻</a> <a href="#example-dpr-dev" title="Examples">💡</a></td>
    <td align="center"><a href="https://github.com/hexagon141"><img src="https://avatars0.githubusercontent.com/u/15704394?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Igor Ryzhov</b></sub></a><br /><a href="https://github.com/effector/effector/commits?author=hexagon141" title="Documentation">📖</a> <a href="https://github.com/effector/effector/commits?author=hexagon141" title="Code">💻</a> <a href="#example-hexagon141" title="Examples">💡</a></td>
  </tr>
  <tr>
    <td align="center"><img src="https://avatars1.githubusercontent.com/u/22044607?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Egor Guscha</b></sub><br /><a href="https://github.com/effector/effector/commits?author=egorguscha" title="Documentation">📖</a></td>
    <td align="center"><img src="https://avatars0.githubusercontent.com/u/47696795?v=4?s=100" width="100px;" alt=""/><br /><sub><b>bakugod</b></sub><br /><a href="https://github.com/effector/effector/commits?author=bakugod" title="Documentation">📖</a> <a href="#example-bakugod" title="Examples">💡</a></td>
    <td align="center"><img src="https://avatars0.githubusercontent.com/u/29141708?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ruslan</b></sub><br /><a href="https://github.com/effector/effector/commits?author=doasync" title="Documentation">📖</a> <a href="https://github.com/effector/effector/commits?author=doasync" title="Code">💻</a> <a href="#ideas-doasync" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/effector/effector/commits?author=doasync" title="Tests">⚠️</a></td>
    <td align="center"><img src="https://avatars2.githubusercontent.com/u/7874664?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Maxim Alyoshin</b></sub><br /><a href="https://github.com/effector/effector/commits?author=mg901" title="Documentation">📖</a></td>
    <td align="center"><img src="https://avatars0.githubusercontent.com/u/25362218?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Andrey Gopienko</b></sub><br /><a href="https://github.com/effector/effector/commits?author=tehSLy" title="Documentation">📖</a></td>
    <td align="center"><img src="https://avatars2.githubusercontent.com/u/13759065?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Vadim Ivanov</b></sub><br /><a href="https://github.com/effector/effector/commits?author=ivanov-v" title="Documentation">📖</a></td>
    <td align="center"><img src="https://avatars3.githubusercontent.com/u/14825383?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Aleksandr Anokhin</b></sub><br /><a href="https://github.com/effector/effector/commits?author=sanohin" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><img src="https://avatars2.githubusercontent.com/u/4208480?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Anton Kosykh</b></sub><br /><a href="https://github.com/effector/effector/commits?author=Kelin2025" title="Code">💻</a></td>
    <td align="center"><img src="https://avatars0.githubusercontent.com/u/1109562?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Konstantin Lebedev</b></sub><br /><a href="#example-RubaXa" title="Examples">💡</a></td>
    <td align="center"><img src="https://avatars3.githubusercontent.com/u/1121997?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Pavel Tereschenko</b></sub><br /><a href="https://github.com/effector/effector/commits?author=bigslycat" title="Code">💻</a></td>
    <td align="center"><img src="https://avatars2.githubusercontent.com/u/29819102?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Satya Rohith</b></sub><br /><a href="https://github.com/effector/effector/commits?author=satyarohith" title="Documentation">📖</a></td>
    <td align="center"><img src="https://avatars1.githubusercontent.com/u/13378944?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Vladislav Melnikov</b></sub><br /><a href="https://github.com/effector/effector/commits?author=vladmelnikov" title="Code">💻</a></td>
    <td align="center"><img src="https://avatars3.githubusercontent.com/u/15311091?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Grigory Zaripov</b></sub><br /><a href="https://github.com/effector/effector/commits?author=gzaripov" title="Code">💻</a></td>
    <td align="center"><img src="https://avatars1.githubusercontent.com/u/37388187?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Marina Miyaoka</b></sub><br /><a href="https://github.com/effector/effector/commits?author=miyaokamarina" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><img src="https://avatars2.githubusercontent.com/u/35740512?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Evgeny Zakharov</b></sub><br /><a href="https://github.com/effector/effector/commits?author=risenforces" title="Documentation">📖</a></td>
    <td align="center"><a href="http://bloadvenro.ru"><img src="https://avatars1.githubusercontent.com/u/11679418?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Viktor</b></sub></a><br /><a href="https://github.com/effector/effector/commits?author=bloadvenro" title="Code">💻</a> <a href="https://github.com/effector/effector/commits?author=bloadvenro" title="Documentation">📖</a> <a href="https://github.com/effector/effector/commits?author=bloadvenro" title="Tests">⚠️</a> <a href="#ideas-bloadvenro" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/abliarsar"><img src="https://avatars3.githubusercontent.com/u/9501504?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ivan Savichev</b></sub></a><br /><a href="https://github.com/effector/effector/commits?author=abliarsar" title="Code">💻</a> <a href="#ideas-abliarsar" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="http://vk.com/dimensi"><img src="https://avatars0.githubusercontent.com/u/11390039?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Nikita Nafranets</b></sub></a><br /><a href="https://github.com/effector/effector/commits?author=dimensi" title="Documentation">📖</a> <a href="#example-dimensi" title="Examples">💡</a></td>
    <td align="center"><a href="https://github.com/Tauka"><img src="https://avatars3.githubusercontent.com/u/15087247?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Tauyekel Kunzhol</b></sub></a><br /><a href="https://github.com/effector/effector/commits?author=Tauka" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/Laiff"><img src="https://avatars0.githubusercontent.com/u/575885?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Andrew Laiff</b></sub></a><br /><a href="https://github.com/effector/effector/commits?author=Laiff" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/ilajosmanov"><img src="https://avatars3.githubusercontent.com/u/18512404?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Illia Osmanov</b></sub></a><br /><a href="https://github.com/effector/effector/commits?author=ilajosmanov" title="Code">💻</a> <a href="#ideas-ilajosmanov" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/YanLobat"><img src="https://avatars3.githubusercontent.com/u/5307423?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Yan</b></sub></a><br /><a href="https://github.com/effector/effector/commits?author=YanLobat" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/egaris"><img src="https://avatars2.githubusercontent.com/u/5036934?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Egor Aristov</b></sub></a><br /><a href="https://github.com/effector/effector/commits?author=egaris" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/Sozonov"><img src="https://avatars2.githubusercontent.com/u/1931637?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sozonov</b></sub></a><br /><a href="https://github.com/effector/effector/commits?author=Sozonov" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/Fl0pZz"><img src="https://avatars2.githubusercontent.com/u/9510124?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Rafael Fakhreev</b></sub></a><br /><a href="https://github.com/effector/effector/commits?author=Fl0pZz" title="Code">💻</a> <a href="#ideas-Fl0pZz" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/effector/effector/commits?author=Fl0pZz" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/yumauri"><img src="https://avatars0.githubusercontent.com/u/6583994?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Victor</b></sub></a><br /><a href="https://github.com/effector/effector/commits?author=yumauri" title="Code">💻</a> <a href="#ideas-yumauri" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/effector/effector/commits?author=yumauri" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/zarabotaet"><img src="https://avatars0.githubusercontent.com/u/15930980?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Dmitrij Shuleshov</b></sub></a><br /><a href="https://github.com/effector/effector/commits?author=zarabotaet" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/kobzarvs"><img src="https://avatars3.githubusercontent.com/u/1615093?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Valeriy Kobzar</b></sub></a><br /><a href="https://github.com/effector/effector/commits?author=kobzarvs" title="Code">💻</a> <a href="#infra-kobzarvs" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#ideas-kobzarvs" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/Spoki4"><img src="https://avatars3.githubusercontent.com/u/2562688?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ivan</b></sub></a><br /><a href="https://github.com/effector/effector/commits?author=Spoki4" title="Code">💻</a> <a href="https://github.com/effector/effector/commits?author=Spoki4" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/oas89"><img src="https://avatars1.githubusercontent.com/u/5285065?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Aleksandr Osipov</b></sub></a><br /><a href="https://github.com/effector/effector/commits?author=oas89" title="Documentation">📖</a> <a href="https://github.com/effector/effector/commits?author=oas89" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/popuguytheparrot"><img src="https://avatars1.githubusercontent.com/u/19804652?v=4?s=100" width="100px;" alt=""/><br /><sub><b>popuguy</b></sub></a><br /><a href="https://github.com/effector/effector/commits?author=popuguytheparrot" title="Documentation">📖</a> <a href="#infra-popuguytheparrot" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#ideas-popuguytheparrot" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/uulaal"><img src="https://avatars.githubusercontent.com/u/38786565?v=4?s=100" width="100px;" alt=""/><br /><sub><b>uulaal</b></sub></a><br /><a href="https://github.com/effector/effector/commits?author=uulaal" title="Code">💻</a></td>
    <td align="center"><a href="https://binjo.ru/"><img src="https://avatars.githubusercontent.com/u/8722478?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Viktor Pasynok</b></sub></a><br /><a href="#infra-binjospookie" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/effector/effector/commits?author=binjospookie" title="Code">💻</a> <a href="https://github.com/effector/effector/commits?author=binjospookie" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

[![Tested with browserstack](https://raw.githubusercontent.com/effector/effector/master/website/media/Browserstack-logo.svg?sanitize=true)](https://BrowserStack.com)
