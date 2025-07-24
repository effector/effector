<p align="center">
  <a href="https://effector.dev" target="_blank" rel="noopener noreferrer">
    <img width="180" src="https://raw.githubusercontent.com/effector/effector/master/website/client/static/img/comet.svg" alt="Effector Comet Logo" />
  </a>
</p>
<br />
<p align="center">
  <a href="https://gitter.im/effector/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge"><img src="https://badges.gitter.im/effector/community.svg" alt="join gitter" /></a>
  <a href="https://github.com/effector/effector/actions/workflows/tests.yml"><img src="https://github.com/effector/effector/actions/workflows/tests.yml/badge.svg?branch=master" alt="build status" /></a>
  <a href="https://discord.gg/t3KkcQdt"><img src="https://img.shields.io/badge/chat-discord-blue?style=flat&logo=discord" alt="discord chat"></a>
  <a href="https://www.patreon.com/zero_bias/overview"><img src="https://img.shields.io/badge/become-a%20patron-%23f96854" alt="become a patron" /></a>
  <a href="https://deepwiki.com/effector/effector"><img src="https://deepwiki.com/badge.svg" alt="Ask DeepWiki"></a>
</p>


# ☄️ effector

Business logic with ease

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

Effector implements business logic with ease for Javascript apps **(React/React Native/Vue/Svelte/Node.js/Vanilla)**, allows you to manage data flow in complex applications. Effector provides best **TypeScript** support _out of the box_.

### Effector follows five basic principles:

- **Application stores should be as light as possible** - the idea of adding a store for specific needs should not be frightening or damaging to the developer.
- **Application stores should be freely combined** - data that the application needs can be statically distributed, showing how it will be converted in runtime.
- **Autonomy from controversial concepts** - no decorators, no need to use classes or proxies - this is not required to control the state of the application and therefore the api library uses only functions and plain js objects
- **Predictability and clarity of API** - a small number of basic principles are reused in different cases, reducing the user's workload and increasing recognition. For example, if you know how .watch works for events, you already know how .watch works for stores.
- **The application is built from simple elements** - space and way to take any required business logic out of the view, maximizing the simplicity of the components.

## Installation

> You can use any package manager

```bash
npm add effector
```

**React**

To getting started read our article [how to write React and Typescript application](https://effector.dev/en/typescript/usage-with-effector-react/).


```bash
npm add effector effector-react
```

**SolidJS**

```bash
npm add effector effector-solid
```

**Vue**

```bash
npm add effector effector-vue
```

**Svelte**

Svelte works with effector out of the box, no additional packages needed. See [word chain](https://github.com/today-/citycatch) game application written with svelte and effector.

**CDN**

- https://www.jsdelivr.com/package/npm/effector
- https://cdn.jsdelivr.net/npm/effector/effector.cjs.js
- https://cdn.jsdelivr.net/npm/effector/effector.mjs
- https://cdn.jsdelivr.net/npm/effector-react/effector-react.cjs.js
- https://cdn.jsdelivr.net/npm/effector-vue/effector-vue.cjs.js

## Documentation

For additional information, guides and api reference visit [our documentation site](https://effector.dev/en/introduction/core-concepts/)

## Packages

- [effector](https://effector.dev/en/api/effector/)
- [effector-react](https://effector.dev/en/api/effector-react/)
- [effector-vue](https://effector.dev/en/api/effector-vue/)

## Articles

- [Why I choose Effector instead of Redux or MobX](https://dev.to/lessmess/why-i-choose-effector-instead-of-redux-or-mobx-3dl7)
- [Effector — State Manager You Should Give a Try](https://itnext.io/effector-state-manager-you-should-give-a-try-b46b917e51cc)
- [Effector vs. Vuex. Which storage management is better for VueJS app?](https://medium.com/blue-harvest-tech-blog/effector-vs-vuex-which-storage-management-is-better-for-vuejs-app-54f3c3257b53)
- [Powerful and fast state manager](https://codeburst.io/effector-state-manager-6ee2e72e8e0b)
- [Testing api calls with effects and stores](https://www.patreon.com/posts/testing-api-with-32415095)
- [Effector's beginner guide](https://dev.to/yanlobat/effector-s-beginner-guide-3jl4)
- [The best part of Effector](https://dev.to/effector/the-best-part-of-effector-4c27)

## Community

- [official](https://community.effector.dev)
- [awesome-effector](https://github.com/effector/awesome-effector) a curated list of awesome effector packages, videos and articles
- [Twitter](https://twitter.com/effectorjs)
- [Telegram](https://t.me/effector_en) (@effector_en)
- [Telegram 🇷🇺](https://t.me/effector_ru) (@effector_ru)
- [dev.to](https://dev.to/effector)
- [Discord](https://discord.gg/yHcMcuRWeC)
- Add a [GitHub Topic `effector`](https://github.com/topics/effector) to your project's home page

## Online playground

You can try effector with [online playground](https://share.effector.dev)

Code sharing, Typescript and react supported out of the box. [Playground repository](https://github.com/effector/repl)

## DevTools

Use [effector-logger](https://github.com/effector/logger) for printing updates to console, displaying current store values with ui or connecting application to familiar redux devtools

<hr />

## More examples [in documentation](https://effector.dev/en/introduction/examples/)

## Learn more

- [Glossary](https://effector.dev/en/explanation/glossary/)
- [Usage with TypeScript](https://effector.dev/en/essentials/typescript/)
- [API docs](https://effector.dev/en/api/effector/effector)
- [Changelog](https://changelog.effector.dev)

## Support us

- Read more articles on [a patreon page](https://www.patreon.com/zero_bias/overview)
- Donate [on OpenCollective](https://opencollective.com/effector)
- Be a sponsor [on Github Sponsors](https://github.com/sponsors/effector)

Your support allows us to improve the developer experience 🧡.

## Contributors

<table>
<tr>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/zerobias>
            <img src=https://avatars.githubusercontent.com/u/15912112?v=4 width="100;"  alt=Dmitry/>
            <br />
            <sub style="font-size:14px"><b>Dmitry</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/goodmind>
            <img src=https://avatars.githubusercontent.com/u/3275424?v=4 width="100;"  alt=andretshurotshka/>
            <br />
            <sub style="font-size:14px"><b>andretshurotshka</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/sergeysova>
            <img src=https://avatars.githubusercontent.com/u/5620073?v=4 width="100;"  alt=Sova/>
            <br />
            <sub style="font-size:14px"><b>Sova</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/AlexandrHoroshih>
            <img src=https://avatars.githubusercontent.com/u/32790736?v=4 width="100;"  alt=Alexander Khoroshikh/>
            <br />
            <sub style="font-size:14px"><b>Alexander Khoroshikh</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/popuguytheparrot>
            <img src=https://avatars.githubusercontent.com/u/19804652?v=4 width="100;"  alt=popuguy/>
            <br />
            <sub style="font-size:14px"><b>popuguy</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/igorkamyshev>
            <img src=https://avatars.githubusercontent.com/u/26767722?v=4 width="100;"  alt=Igor Kamyşev/>
            <br />
            <sub style="font-size:14px"><b>Igor Kamyşev</b></sub>
        </a>
    </td>
</tr>
<tr>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/pxbuffer>
            <img src=https://avatars.githubusercontent.com/u/22044607?v=4 width="100;"  alt=pxbuffer/>
            <br />
            <sub style="font-size:14px"><b>pxbuffer</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/kobzarvs>
            <img src=https://avatars.githubusercontent.com/u/1615093?v=4 width="100;"  alt=Valeriy Kobzar/>
            <br />
            <sub style="font-size:14px"><b>Valeriy Kobzar</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/YanLobat>
            <img src=https://avatars.githubusercontent.com/u/5307423?v=4 width="100;"  alt=Yan/>
            <br />
            <sub style="font-size:14px"><b>Yan</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/ilajosmanov>
            <img src=https://avatars.githubusercontent.com/u/18512404?v=4 width="100;"  alt=Illia Osmanov/>
            <br />
            <sub style="font-size:14px"><b>Illia Osmanov</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/doasync>
            <img src=https://avatars.githubusercontent.com/u/29141708?v=4 width="100;"  alt=Ruslan @doasync/>
            <br />
            <sub style="font-size:14px"><b>Ruslan @doasync</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/mg901>
            <img src=https://avatars.githubusercontent.com/u/7874664?v=4 width="100;"  alt=mg901/>
            <br />
            <sub style="font-size:14px"><b>mg901</b></sub>
        </a>
    </td>
</tr>
<tr>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/hexagon141>
            <img src=https://avatars.githubusercontent.com/u/15704394?v=4 width="100;"  alt=Igor Ryzhov/>
            <br />
            <sub style="font-size:14px"><b>Igor Ryzhov</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/dpr-dev>
            <img src=https://avatars.githubusercontent.com/u/23157659?v=4 width="100;"  alt=Arthur Irgashev/>
            <br />
            <sub style="font-size:14px"><b>Arthur Irgashev</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/bloadvenro>
            <img src=https://avatars.githubusercontent.com/u/11679418?v=4 width="100;"  alt=Viktor/>
            <br />
            <sub style="font-size:14px"><b>Viktor</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/movpushmov>
            <img src=https://avatars.githubusercontent.com/u/49155506?v=4 width="100;"  alt=Edward Gigolaev/>
            <br />
            <sub style="font-size:14px"><b>Edward Gigolaev</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/Komar0ff>
            <img src=https://avatars.githubusercontent.com/u/10588170?v=4 width="100;"  alt=Ilya/>
            <br />
            <sub style="font-size:14px"><b>Ilya</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/ainursharaev>
            <img src=https://avatars.githubusercontent.com/u/33234903?v=4 width="100;"  alt=Ainur/>
            <br />
            <sub style="font-size:14px"><b>Ainur</b></sub>
        </a>
    </td>
</tr>
<tr>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/Olovyannikov>
            <img src=https://avatars.githubusercontent.com/u/54705024?v=4 width="100;"  alt=Ilya Olovyannikov/>
            <br />
            <sub style="font-size:14px"><b>Ilya Olovyannikov</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/senzujuju>
            <img src=https://avatars.githubusercontent.com/u/95025705?v=4 width="100;"  alt=Nikita Kungurcev/>
            <br />
            <sub style="font-size:14px"><b>Nikita Kungurcev</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/kireevmp>
            <img src=https://avatars.githubusercontent.com/u/29187880?v=4 width="100;"  alt=Mikhail Kireev/>
            <br />
            <sub style="font-size:14px"><b>Mikhail Kireev</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/artalar>
            <img src=https://avatars.githubusercontent.com/u/27290320?v=4 width="100;"  alt=Arutyunyan Artem/>
            <br />
            <sub style="font-size:14px"><b>Arutyunyan Artem</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/zarabotaet>
            <img src=https://avatars.githubusercontent.com/u/15930980?v=4 width="100;"  alt=Dmitrij Shuleshov/>
            <br />
            <sub style="font-size:14px"><b>Dmitrij Shuleshov</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/abliarsar>
            <img src=https://avatars.githubusercontent.com/u/9501504?v=4 width="100;"  alt=Ivan Savichev/>
            <br />
            <sub style="font-size:14px"><b>Ivan Savichev</b></sub>
        </a>
    </td>
</tr>
<tr>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/dimensi>
            <img src=https://avatars.githubusercontent.com/u/11390039?v=4 width="100;"  alt=Nikita Nafranets/>
            <br />
            <sub style="font-size:14px"><b>Nikita Nafranets</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/oas89>
            <img src=https://avatars.githubusercontent.com/u/5285065?v=4 width="100;"  alt=Aleksandr Osipov/>
            <br />
            <sub style="font-size:14px"><b>Aleksandr Osipov</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/bakugod>
            <img src=https://avatars.githubusercontent.com/u/47696795?v=4 width="100;"  alt=bakugod/>
            <br />
            <sub style="font-size:14px"><b>bakugod</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/Zukhrik>
            <img src=https://avatars.githubusercontent.com/u/67275391?v=4 width="100;"  alt=Зухриддин Камильжанов/>
            <br />
            <sub style="font-size:14px"><b>Зухриддин Камильжанов</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/victordidenko>
            <img src=https://avatars.githubusercontent.com/u/15016227?v=4 width="100;"  alt=Victor Didenko/>
            <br />
            <sub style="font-size:14px"><b>Victor Didenko</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/mitapfer>
            <img src=https://avatars.githubusercontent.com/u/65118092?v=4 width="100;"  alt=Mikhail Krilov/>
            <br />
            <sub style="font-size:14px"><b>Mikhail Krilov</b></sub>
        </a>
    </td>
</tr>
<tr>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/binjospookie>
            <img src=https://avatars.githubusercontent.com/u/8722478?v=4 width="100;"  alt=Viktor Pasynok/>
            <br />
            <sub style="font-size:14px"><b>Viktor Pasynok</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/Drevoed>
            <img src=https://avatars.githubusercontent.com/u/53709100?v=4 width="100;"  alt=Kirill Mironov/>
            <br />
            <sub style="font-size:14px"><b>Kirill Mironov</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/tehSLy>
            <img src=https://avatars.githubusercontent.com/u/25362218?v=4 width="100;"  alt=Andrei/>
            <br />
            <sub style="font-size:14px"><b>Andrei</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/den-churbanov>
            <img src=https://avatars.githubusercontent.com/u/69584218?v=4 width="100;"  alt=Denis/>
            <br />
            <sub style="font-size:14px"><b>Denis</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/egoson>
            <img src=https://avatars.githubusercontent.com/u/42109109?v=4 width="100;"  alt=Filipkin Denis/>
            <br />
            <sub style="font-size:14px"><b>Filipkin Denis</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/Spoki4>
            <img src=https://avatars.githubusercontent.com/u/2562688?v=4 width="100;"  alt=Ivan/>
            <br />
            <sub style="font-size:14px"><b>Ivan</b></sub>
        </a>
    </td>
</tr>
<tr>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/ivanov-v>
            <img src=https://avatars.githubusercontent.com/u/13759065?v=4 width="100;"  alt=Ivanov Vadim/>
            <br />
            <sub style="font-size:14px"><b>Ivanov Vadim</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/sergey20x25>
            <img src=https://avatars.githubusercontent.com/u/47494062?v=4 width="100;"  alt=sergey20x25/>
            <br />
            <sub style="font-size:14px"><b>sergey20x25</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/Rastraponovich>
            <img src=https://avatars.githubusercontent.com/u/58354560?v=4 width="100;"  alt=Rastrapon/>
            <br />
            <sub style="font-size:14px"><b>Rastrapon</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/ExLineP>
            <img src=https://avatars.githubusercontent.com/u/12397836?v=4 width="100;"  alt=Dan/>
            <br />
            <sub style="font-size:14px"><b>Dan</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/mindyourlifeguide>
            <img src=https://avatars.githubusercontent.com/u/35348648?v=4 width="100;"  alt=Bohdan Petrov/>
            <br />
            <sub style="font-size:14px"><b>Bohdan Petrov</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/bartlomiejwendt>
            <img src=https://avatars.githubusercontent.com/u/60364336?v=4 width="100;"  alt=Bartłomiej Wendt/>
            <br />
            <sub style="font-size:14px"><b>Bartłomiej Wendt</b></sub>
        </a>
    </td>
</tr>
<tr>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/Laiff>
            <img src=https://avatars.githubusercontent.com/u/575885?v=4 width="100;"  alt=Andrei Antropov/>
            <br />
            <sub style="font-size:14px"><b>Andrei Antropov</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/faustienf>
            <img src=https://avatars.githubusercontent.com/u/3603479?v=4 width="100;"  alt=☃︎/>
            <br />
            <sub style="font-size:14px"><b>☃︎</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/xaota>
            <img src=https://avatars.githubusercontent.com/u/1172619?v=4 width="100;"  alt=xaota/>
            <br />
            <sub style="font-size:14px"><b>xaota</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/cqh963852>
            <img src=https://avatars.githubusercontent.com/u/17702287?v=4 width="100;"  alt=cqh/>
            <br />
            <sub style="font-size:14px"><b>cqh</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/aldibatyr>
            <img src=https://avatars.githubusercontent.com/u/47831819?v=4 width="100;"  alt=Aldiyar Batyrbekov/>
            <br />
            <sub style="font-size:14px"><b>Aldiyar Batyrbekov</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/Minhir>
            <img src=https://avatars.githubusercontent.com/u/7985223?v=4 width="100;"  alt=Vladimir Ivakin/>
            <br />
            <sub style="font-size:14px"><b>Vladimir Ivakin</b></sub>
        </a>
    </td>
</tr>
<tr>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/afoninv>
            <img src=https://avatars.githubusercontent.com/u/1100466?v=4 width="100;"  alt=Vitaly Afonin/>
            <br />
            <sub style="font-size:14px"><b>Vitaly Afonin</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/yumauri>
            <img src=https://avatars.githubusercontent.com/u/6583994?v=4 width="100;"  alt=Victor/>
            <br />
            <sub style="font-size:14px"><b>Victor</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/Tauka>
            <img src=https://avatars.githubusercontent.com/u/15087247?v=4 width="100;"  alt=Tauyekel Kunzhol/>
            <br />
            <sub style="font-size:14px"><b>Tauyekel Kunzhol</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/enomado>
            <img src=https://avatars.githubusercontent.com/u/707007?v=4 width="100;"  alt=Ivan/>
            <br />
            <sub style="font-size:14px"><b>Ivan</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/Sozonov>
            <img src=https://avatars.githubusercontent.com/u/1931637?v=4 width="100;"  alt=Sozonov/>
            <br />
            <sub style="font-size:14px"><b>Sozonov</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/TngSam>
            <img src=https://avatars.githubusercontent.com/u/25546058?v=4 width="100;"  alt=Samir/>
            <br />
            <sub style="font-size:14px"><b>Samir</b></sub>
        </a>
    </td>
</tr>
<tr>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/sagdeev>
            <img src=https://avatars.githubusercontent.com/u/8946162?v=4 width="100;"  alt=Renat Sagdeev/>
            <br />
            <sub style="font-size:14px"><b>Renat Sagdeev</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/bybbsy>
            <img src=https://avatars.githubusercontent.com/u/79372250?v=4 width="100;"  alt=Kirill/>
            <br />
            <sub style="font-size:14px"><b>Kirill</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/gamtiq>
            <img src=https://avatars.githubusercontent.com/u/1177323?v=4 width="100;"  alt=Denis Sikuler/>
            <br />
            <sub style="font-size:14px"><b>Denis Sikuler</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/chshanovskiy>
            <img src=https://avatars.githubusercontent.com/u/8307163?v=4 width="100;"  alt=Chshanovskiy Maxim/>
            <br />
            <sub style="font-size:14px"><b>Chshanovskiy Maxim</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/Arsen-95>
            <img src=https://avatars.githubusercontent.com/u/83858217?v=4 width="100;"  alt=Arsen-95/>
            <br />
            <sub style="font-size:14px"><b>Arsen-95</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/yurovant>
            <img src=https://avatars.githubusercontent.com/u/11337124?v=4 width="100;"  alt=Anton Yurovskykh/>
            <br />
            <sub style="font-size:14px"><b>Anton Yurovskykh</b></sub>
        </a>
    </td>
</tr>
<tr>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/Kelin2025>
            <img src=https://avatars.githubusercontent.com/u/4208480?v=4 width="100;"  alt=Anton Kosykh/>
            <br />
            <sub style="font-size:14px"><b>Anton Kosykh</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/belovsandr>
            <img src=https://avatars.githubusercontent.com/u/16794134?v=4 width="100;"  alt=Aleksandr Belov/>
            <br />
            <sub style="font-size:14px"><b>Aleksandr Belov</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/usmanyunusov>
            <img src=https://avatars.githubusercontent.com/u/28816324?v=4 width="100;"  alt=Usman Yunusov/>
            <br />
            <sub style="font-size:14px"><b>Usman Yunusov</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/vsviridov>
            <img src=https://avatars.githubusercontent.com/u/221684?v=4 width="100;"  alt=Vasili Sviridov/>
            <br />
            <sub style="font-size:14px"><b>Vasili Sviridov</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/vsvirydau-cl>
            <img src=https://avatars.githubusercontent.com/u/55260532?v=4 width="100;"  alt=Vasili Svirydau/>
            <br />
            <sub style="font-size:14px"><b>Vasili Svirydau</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/VictorKolb>
            <img src=https://avatars.githubusercontent.com/u/14196649?v=4 width="100;"  alt=Victor Kolb/>
            <br />
            <sub style="font-size:14px"><b>Victor Kolb</b></sub>
        </a>
    </td>
</tr>
<tr>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/Vladislav2397>
            <img src=https://avatars.githubusercontent.com/u/53734286?v=4 width="100;"  alt=Vladislav/>
            <br />
            <sub style="font-size:14px"><b>Vladislav</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/vladmelnikov>
            <img src=https://avatars.githubusercontent.com/u/13378944?v=4 width="100;"  alt=Vladislav Melnikov/>
            <br />
            <sub style="font-size:14px"><b>Vladislav Melnikov</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/darky>
            <img src=https://avatars.githubusercontent.com/u/1832800?v=4 width="100;"  alt=Vladislav Botvin/>
            <br />
            <sub style="font-size:14px"><b>Vladislav Botvin</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/willheslam>
            <img src=https://avatars.githubusercontent.com/u/5377213?v=4 width="100;"  alt=Will Heslam/>
            <br />
            <sub style="font-size:14px"><b>Will Heslam</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/xxxxue>
            <img src=https://avatars.githubusercontent.com/u/32764266?v=4 width="100;"  alt=xxxxue/>
            <br />
            <sub style="font-size:14px"><b>xxxxue</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/gitter-badger>
            <img src=https://avatars.githubusercontent.com/u/8518239?v=4 width="100;"  alt=The Gitter Badger/>
            <br />
            <sub style="font-size:14px"><b>The Gitter Badger</b></sub>
        </a>
    </td>
</tr>
<tr>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/Zulcom>
            <img src=https://avatars.githubusercontent.com/u/11247988?v=4 width="100;"  alt=Simon Muravev/>
            <br />
            <sub style="font-size:14px"><b>Simon Muravev</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/Shiyan7>
            <img src=https://avatars.githubusercontent.com/u/57950265?v=4 width="100;"  alt=Shiyan7/>
            <br />
            <sub style="font-size:14px"><b>Shiyan7</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/belozer>
            <img src=https://avatars.githubusercontent.com/u/1655916?v=4 width="100;"  alt=Sergey Belozyorcev/>
            <br />
            <sub style="font-size:14px"><b>Sergey Belozyorcev</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/satyarohith>
            <img src=https://avatars.githubusercontent.com/u/29819102?v=4 width="100;"  alt=Satya Rohith/>
            <br />
            <sub style="font-size:14px"><b>Satya Rohith</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/falkomerr>
            <img src=https://avatars.githubusercontent.com/u/105551615?v=4 width="100;"  alt=Roman Paravaev/>
            <br />
            <sub style="font-size:14px"><b>Roman Paravaev</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/GTech1256>
            <img src=https://avatars.githubusercontent.com/u/18086485?v=4 width="100;"  alt=Roman/>
            <br />
            <sub style="font-size:14px"><b>Roman</b></sub>
        </a>
    </td>
</tr>
<tr>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/raidenmiro>
            <img src=https://avatars.githubusercontent.com/u/82271383?v=4 width="100;"  alt=Robert Kuzhin/>
            <br />
            <sub style="font-size:14px"><b>Robert Kuzhin</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/romadryud>
            <img src=https://avatars.githubusercontent.com/u/19193036?v=4 width="100;"  alt=Raman Aktsisiuk/>
            <br />
            <sub style="font-size:14px"><b>Raman Aktsisiuk</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/rachaeldawn>
            <img src=https://avatars.githubusercontent.com/u/7696498?v=4 width="100;"  alt=Rachael Dawn/>
            <br />
            <sub style="font-size:14px"><b>Rachael Dawn</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/vladthelittleone>
            <img src=https://avatars.githubusercontent.com/u/4215285?v=4 width="100;"  alt=vladthelittleone/>
            <br />
            <sub style="font-size:14px"><b>vladthelittleone</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/rokashkovvd>
            <img src=https://avatars.githubusercontent.com/u/166542865?v=4 width="100;"  alt=Vladimir/>
            <br />
            <sub style="font-size:14px"><b>Vladimir</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/nulladdict>
            <img src=https://avatars.githubusercontent.com/u/26379644?v=4 width="100;"  alt=roman/>
            <br />
            <sub style="font-size:14px"><b>roman</b></sub>
        </a>
    </td>
</tr>
<tr>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/miyaokamarina>
            <img src=https://avatars.githubusercontent.com/u/37388187?v=4 width="100;"  alt=Eris/>
            <br />
            <sub style="font-size:14px"><b>Eris</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/At-Sky>
            <img src=https://avatars.githubusercontent.com/u/88156646?v=4 width="100;"  alt=lightningmq/>
            <br />
            <sub style="font-size:14px"><b>lightningmq</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/leushkin>
            <img src=https://avatars.githubusercontent.com/u/26031322?v=4 width="100;"  alt=Kirill Leushkin/>
            <br />
            <sub style="font-size:14px"><b>Kirill Leushkin</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/nonzzz>
            <img src=https://avatars.githubusercontent.com/u/52351095?v=4 width="100;"  alt=kanno/>
            <br />
            <sub style="font-size:14px"><b>kanno</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/ilyaagarkov>
            <img src=https://avatars.githubusercontent.com/u/10822601?v=4 width="100;"  alt=Ilya/>
            <br />
            <sub style="font-size:14px"><b>Ilya</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/ilfey>
            <img src=https://avatars.githubusercontent.com/u/68865207?v=4 width="100;"  alt=ilfey/>
            <br />
            <sub style="font-size:14px"><b>ilfey</b></sub>
        </a>
    </td>
</tr>
<tr>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/astrobot-houston>
            <img src=https://avatars.githubusercontent.com/u/108291165?v=4 width="100;"  alt=Houston (Bot)/>
            <br />
            <sub style="font-size:14px"><b>Houston (Bot)</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/gzaripov>
            <img src=https://avatars.githubusercontent.com/u/15311091?v=4 width="100;"  alt=Grigory Zaripov/>
            <br />
            <sub style="font-size:14px"><b>Grigory Zaripov</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/dmitryplyaskin>
            <img src=https://avatars.githubusercontent.com/u/35658668?v=4 width="100;"  alt=dmitryplyaskin/>
            <br />
            <sub style="font-size:14px"><b>dmitryplyaskin</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/c01nd01r>
            <img src=https://avatars.githubusercontent.com/u/3511312?v=4 width="100;"  alt=Stanislav/>
            <br />
            <sub style="font-size:14px"><b>Stanislav</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/artlud39>
            <img src=https://avatars.githubusercontent.com/u/84090099?v=4 width="100;"  alt=Артём Жолудь/>
            <br />
            <sub style="font-size:14px"><b>Артём Жолудь</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/ansunrisein>
            <img src=https://avatars.githubusercontent.com/u/45604301?v=4 width="100;"  alt=ansunrisein/>
            <br />
            <sub style="font-size:14px"><b>ansunrisein</b></sub>
        </a>
    </td>
</tr>
<tr>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/anatolykopyl>
            <img src=https://avatars.githubusercontent.com/u/33553182?v=4 width="100;"  alt=Anatoly Kopyl/>
            <br />
            <sub style="font-size:14px"><b>Anatoly Kopyl</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/bonkboykz>
            <img src=https://avatars.githubusercontent.com/u/4549476?v=4 width="100;"  alt=Yesset Zhussupov/>
            <br />
            <sub style="font-size:14px"><b>Yesset Zhussupov</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/WoodenPC>
            <img src=https://avatars.githubusercontent.com/u/25397745?v=4 width="100;"  alt=Rasul />
            <br />
            <sub style="font-size:14px"><b>Rasul </b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/outbreak>
            <img src=https://avatars.githubusercontent.com/u/64531?v=4 width="100;"  alt=Dmitry Dudin/>
            <br />
            <sub style="font-size:14px"><b>Dmitry Dudin</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/tensenrey>
            <img src=https://avatars.githubusercontent.com/u/67154333?v=4 width="100;"  alt=Dmitry/>
            <br />
            <sub style="font-size:14px"><b>Dmitry</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/dskiba>
            <img src=https://avatars.githubusercontent.com/u/28356785?v=4 width="100;"  alt=Denis Skiba/>
            <br />
            <sub style="font-size:14px"><b>Denis Skiba</b></sub>
        </a>
    </td>
</tr>
<tr>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/hyposlasher>
            <img src=https://avatars.githubusercontent.com/u/13961762?v=4 width="100;"  alt=Dinislam Maushov/>
            <br />
            <sub style="font-size:14px"><b>Dinislam Maushov</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/ayuhito>
            <img src=https://avatars.githubusercontent.com/u/38220115?v=4 width="100;"  alt=Ayu/>
            <br />
            <sub style="font-size:14px"><b>Ayu</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/000000armor>
            <img src=https://avatars.githubusercontent.com/u/25207729?v=4 width="100;"  alt=David/>
            <br />
            <sub style="font-size:14px"><b>David</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/BlackPoretsky>
            <img src=https://avatars.githubusercontent.com/u/84518407?v=4 width="100;"  alt=Egor Gorochkin/>
            <br />
            <sub style="font-size:14px"><b>Egor Gorochkin</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/tekacs>
            <img src=https://avatars.githubusercontent.com/u/63247?v=4 width="100;"  alt=Amar Sood/>
            <br />
            <sub style="font-size:14px"><b>Amar Sood</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/Alexandrsv>
            <img src=https://avatars.githubusercontent.com/u/15097064?v=4 width="100;"  alt=Александр/>
            <br />
            <sub style="font-size:14px"><b>Александр</b></sub>
        </a>
    </td>
</tr>
<tr>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/mihasia20008>
            <img src=https://avatars.githubusercontent.com/u/9918427?v=4 width="100;"  alt=Alexander/>
            <br />
            <sub style="font-size:14px"><b>Alexander</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/sanohin>
            <img src=https://avatars.githubusercontent.com/u/14825383?v=4 width="100;"  alt=Alex Anokhin/>
            <br />
            <sub style="font-size:14px"><b>Alex Anokhin</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/jokecodes>
            <img src=https://avatars.githubusercontent.com/u/12380196?v=4 width="100;"  alt=jokecodes/>
            <br />
            <sub style="font-size:14px"><b>jokecodes</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/yialo>
            <img src=https://avatars.githubusercontent.com/u/38593881?v=4 width="100;"  alt=Alex Arro/>
            <br />
            <sub style="font-size:14px"><b>Alex Arro</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/domosedov>
            <img src=https://avatars.githubusercontent.com/u/42298502?v=4 width="100;"  alt=Aleksandr Grigorii/>
            <br />
            <sub style="font-size:14px"><b>Aleksandr Grigorii</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/abelsiqueira>
            <img src=https://avatars.githubusercontent.com/u/1068752?v=4 width="100;"  alt=Abel Soares Siqueira/>
            <br />
            <sub style="font-size:14px"><b>Abel Soares Siqueira</b></sub>
        </a>
    </td>
</tr>
<tr>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/7iomka>
            <img src=https://avatars.githubusercontent.com/u/18473137?v=4 width="100;"  alt=7iomka/>
            <br />
            <sub style="font-size:14px"><b>7iomka</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/focusbytheway>
            <img src=https://avatars.githubusercontent.com/u/45828023?v=4 width="100;"  alt=Abdukerim Radjapov/>
            <br />
            <sub style="font-size:14px"><b>Abdukerim Radjapov</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/0xflotus>
            <img src=https://avatars.githubusercontent.com/u/26602940?v=4 width="100;"  alt=0xflotus/>
            <br />
            <sub style="font-size:14px"><b>0xflotus</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/bigslycat>
            <img src=https://avatars.githubusercontent.com/u/1121997?v=4 width="100;"  alt=bigslycat/>
            <br />
            <sub style="font-size:14px"><b>bigslycat</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/pgrekovich>
            <img src=https://avatars.githubusercontent.com/u/1001687?v=4 width="100;"  alt=Pavel Hrakovich/>
            <br />
            <sub style="font-size:14px"><b>Pavel Hrakovich</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/exuvia-dev>
            <img src=https://avatars.githubusercontent.com/u/19880334?v=4 width="100;"  alt=Oleh/>
            <br />
            <sub style="font-size:14px"><b>Oleh</b></sub>
        </a>
    </td>
</tr>
<tr>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/olejech>
            <img src=https://avatars.githubusercontent.com/u/64708593?v=4 width="100;"  alt=Oleg/>
            <br />
            <sub style="font-size:14px"><b>Oleg</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/mikecann>
            <img src=https://avatars.githubusercontent.com/u/215033?v=4 width="100;"  alt=Mike Cann/>
            <br />
            <sub style="font-size:14px"><b>Mike Cann</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/MiiZZo>
            <img src=https://avatars.githubusercontent.com/u/58049702?v=4 width="100;"  alt=Nikita Svoyachenko/>
            <br />
            <sub style="font-size:14px"><b>Nikita Svoyachenko</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/lud>
            <img src=https://avatars.githubusercontent.com/u/637632?v=4 width="100;"  alt=Ludovic Dem/>
            <br />
            <sub style="font-size:14px"><b>Ludovic Dem</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/Leniorko>
            <img src=https://avatars.githubusercontent.com/u/26775798?v=4 width="100;"  alt=Leniorko/>
            <br />
            <sub style="font-size:14px"><b>Leniorko</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/RubaXa>
            <img src=https://avatars.githubusercontent.com/u/1109562?v=4 width="100;"  alt=Lebedev Konstantin/>
            <br />
            <sub style="font-size:14px"><b>Lebedev Konstantin</b></sub>
        </a>
    </td>
</tr>
<tr>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/joelbandi>
            <img src=https://avatars.githubusercontent.com/u/15027870?v=4 width="100;"  alt=Joel Bandi/>
            <br />
            <sub style="font-size:14px"><b>Joel Bandi</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/jsejcksn>
            <img src=https://avatars.githubusercontent.com/u/868251?v=4 width="100;"  alt=Jesse Jackson/>
            <br />
            <sub style="font-size:14px"><b>Jesse Jackson</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/jankeromnes>
            <img src=https://avatars.githubusercontent.com/u/599268?v=4 width="100;"  alt=Jan Keromnes/>
            <br />
            <sub style="font-size:14px"><b>Jan Keromnes</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/vanpav>
            <img src=https://avatars.githubusercontent.com/u/2944759?v=4 width="100;"  alt=Ivan/>
            <br />
            <sub style="font-size:14px"><b>Ivan</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/newbornfrontender>
            <img src=https://avatars.githubusercontent.com/u/34810942?v=4 width="100;"  alt=Infant Frontender/>
            <br />
            <sub style="font-size:14px"><b>Infant Frontender</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/Ilmar7786>
            <img src=https://avatars.githubusercontent.com/u/84752977?v=4 width="100;"  alt=Ilya Martynov/>
            <br />
            <sub style="font-size:14px"><b>Ilya Martynov</b></sub>
        </a>
    </td>
</tr>
<tr>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/TerrniT>
            <img src=https://avatars.githubusercontent.com/u/104818206?v=4 width="100;"  alt=Gleb Kotovsky/>
            <br />
            <sub style="font-size:14px"><b>Gleb Kotovsky</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/husek>
            <img src=https://avatars.githubusercontent.com/u/4630702?v=4 width="100;"  alt=Gabriel Husek/>
            <br />
            <sub style="font-size:14px"><b>Gabriel Husek</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/edprince>
            <img src=https://avatars.githubusercontent.com/u/7027089?v=4 width="100;"  alt=Ed Prince/>
            <br />
            <sub style="font-size:14px"><b>Ed Prince</b></sub>
        </a>
    </td>
</tr>
</table>

[![Tested with browserstack](https://raw.githubusercontent.com/effector/effector/master/website/media/Browserstack-logo.svg?sanitize=true)](https://BrowserStack.com)
