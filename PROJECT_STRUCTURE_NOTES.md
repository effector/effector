# Наблюдения о структуре проекта effector

## Общее
Монорепозиторий на yarn (без workspaces-манифеста), с кастомным раннером сборки `tools/build.js`.
Node >= 20, пакетный менеджер — yarn 1.22.22.

## Ключевые директории

- `src/` — исходники, разбиты по подсистемам:
  - `effector/` — ядро библиотеки (stores, events, effects, domains, fork)
  - `react/`, `vue/`, `solid/` — биндинги для UI-фреймворков
  - `forest/` — реактивный UI-рендерер (свой, не react/vue/solid)
  - `babel/` — babel-плагины (в т.ч. для effector и react)
  - `types/` — система типов и генератор тестов типов (`testGenerator.ts`, manifold-раннер)
  - `compat/`, `fixtures/` — вспомогательное

- `packages/` — «источники» npm-пакетов: `effector`, `effector-react`, `effector-solid`,
  `effector-vue`, `forest`. Содержат package.json и точки входа/реэкспорты, а не сам билд.

- `npm/` — результат сборки (генерируется командой `yarn build`, в `.gitignore`).
  Для каждого пакета собираются CJS/ESM/UMD-бандлы (`*.cjs.js` / `*.mjs` / `*.umd.js`),
  декларации `*.d.ts` и sourcemaps. В `effector` дополнительно лежит `babel-plugin.js`.

- `tools/` — билд-система: `build.js` — точка входа, `tools/builder/` — сам раннер задач
  поверх Rollup/Babel/TypeScript. Задачи объявлены в `tasks/*.ts` (`common.ts`, `effector.ts`,
  `hooks.ts`, `index.ts`).

- `documentation/` — отдельный Astro-проект (сайт документации effector.dev), со своим
  `package.json`/`pnpm-lock.yaml`, независимый от корневого сборочного пайплайна.

- `examples/` — примеры использования: React, React Native, SSR (serverless, обычный),
  worker-rpc, голые JS/HTML-примеры.

- `recipes/` — небольшие готовые рецепты (например, `media-queries`).

- `.github/` — конфигурация CI.

## Сборка

- `yarn install` — установка зависимостей (проходит, есть несколько предупреждений о peer deps,
  не блокирующих).
- `yarn build` → `node tools/build` — собирает все 5 таргетов (`effector`, `effector-react`,
  `effector-vue`, `effector-solid`, `forest`) примерно за 20 секунд, кладёт результат в `npm/`.
- `yarn test` — запуск тестов через Jest (`jest.config.js`), есть отдельные конфигурации для
  старого React (`test:old-react`) и генерации тестов типов (`test:generate`).
- Сборка и установка зависимостей не меняют отслеживаемые git файлы — весь вывод (`npm/`,
  `node_modules/`, `stats/`) игнорируется.
