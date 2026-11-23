---
name: astro
description: Skill for using Astro projects. Includes CLI commands, project structure, core config options, and adapters. Use this skill when the user needs to work with Astro or when the user mentions Astro.
license: MIT
metadata: 
  authors: "Astro Team"
  version: "0.0.1"
---

# Astro Usage Guide

**Always consult [docs.astro.build](https://docs.astro.build) for code examples and latest API.**

Astro is the web framework for content-driven websites.

---

## Quick Reference

### File Location
CLI looks for `astro.config.js`, `astro.config.mjs`, `astro.config.cjs`, and `astro.config.ts` in: `./`. Use `--config` for custom path.

### CLI Commands

- `npx astro dev` -  Start the development server.
- `npx astro build` - Build your project and write it to disk.
- `npx astro check` - Check your project for errors.
- `npx astro add` - Add an integration.
- `npmx astro sync` - Generate TypeScript types for all Astro modules.

**Re-run after adding/changing plugins.**

### Project Structure

Astro leverages an opinionated folder layout for your project. Every Astro project root should include some directories and files. Reference [project structure docs](https://docs.astro.build/en/basics/project-structure).

- `src/*` - Your project source code (components, pages, styles, images, etc.)
- `src/pages` - Required sub-directory in your Astro project. Without it, your site will have no pages or routes!
- `src/components` - It is common to group and organize all of your project components together in this folder. This is a common convention in Astro projects, but it is not required. Feel free to organize your components however you like!
- `src/layouts` - Just like `src/components`, this directory is a common convention but not required.
- `src/styles` - It is a common convention to store your CSS or Sass files here, but this is not required. As long as your styles live somewhere in the src/ directory and are imported correctly, Astro will handle and optimize them.
- `public/*` - Your non-code, unprocessed assets (fonts, icons, etc.). The files in this folder will be copied into the build folder untouched, and then your site will be built.
- `package.json` - A project manifest.
- `astro.config.{js,mjs,cjs,ts}` - An Astro configuration file. (recommended)
- `tsconfig.json` - A TypeScript configuration file. (recommended)

---

## Core Config Options

| Option | Notes |
|--------|-------|
| `site` | Your final, deployed URL. Astro uses this full URL to generate your sitemap and canonical URLs in your final build. |

---

## Adapters

Deploy to your favorite server, serverless, or edge host with build adapters. Use an adapter to enable on-demand rendering in your Astro project.

**Add [Node.js](https://docs.astro.build/en/guides/integrations-guide/node) adapter using astro add:**
```
npx astro add node --yes
```

**Add [Cloudflare](https://docs.astro.build/en/guides/integrations-guide/cloudflare) adapter using astro add:**
```
npx astro add cloudflare --yes
```

**Add [Netlify](https://docs.astro.build/en/guides/integrations-guide/netlify) adapter using astro add:**
```
npx astro add netlify --yes
```

**Add [Vercel](https://docs.astro.build/en/guides/integrations-guide/vercel) adapter using astro add:**
```
npx astro add vercel --yes
```

[Other Community adapters](https://astro.build/integrations/2/?search=&categories%5B%5D=adapters)

## Resources

- [Docs](https://docs.astro.build)
- [Config Reference](https://docs.astro.build/en/reference/configuration-reference/)
- [llms.txt](https://docs.astro.build/llms.txt)
- [GitHub](https://github.com/withastro/astro)
