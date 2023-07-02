# Documentation

## Content files

All files of the content can be written using MD or MDX inside `src/content/docs/[lang]`.

Astro can find localized version via the same slug (path to the document) in the another directory:

- `src/content/docs/[lang]/[slug].md` (_or `.mdx`_)
- `src/content/docs/en/api/effector/clearNode.md`
- `src/content/docs/ru/api/effector/clearNode.md`

## Configuration

The most basic setup is in `src/consts.ts`.

Translation of the UI elements is in `src/languages.ts`.

All navigation structure is in `src/navigation.ts`.

## Run

Simply install the `pnpm` and run:

```shell
pnpm install
pnpm start
```

To fetch commits history, you need Github Personal Access Token. Just add it:

```shell
GITHUB_TOKEN=github_pat_REDACTED_TOKEN pnpm start
```

### Search

By default search disabled on the local machine due to index requirements. But you can enable it by following steps:

1. Build the docs — `COMPRESS=false pnpm build`
2. Start search serve server — `pnpm search:dev`
3. Start astro with env parameter `PUBLIC_SEARCH=true pnpm dev`

`COMPRESS=false` disables compressing, to speed up build.
