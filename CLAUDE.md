# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start Vite dev server with HMR
- `npm run build` — Production build (outputs to dist/)
- `npm run preview` — Preview production build locally
- `npm run check` — Type-check with svelte-check and TypeScript

No lint or test commands are configured.

## Tech Stack

- **Svelte 5** (uses `$state` rune-based reactivity, not legacy `$:` syntax)
- **Vite 7** with `@sveltejs/vite-plugin-svelte`
- **TypeScript 5.9** in strict mode
- ES module project (`"type": "module"` in package.json)

## Architecture

Single-page application with this entry flow:

`index.html` → `src/main.ts` → `src/App.svelte`

- **src/main.ts** — Mounts the root Svelte component to `#app`
- **src/App.svelte** — Root component
- **src/lib/** — Reusable components
- **src/assets/** — Static assets bundled by Vite
- **public/** — Static assets served as-is

Components use Svelte 5 reactive state via `let count = $state(0)` and scoped `<style>` blocks.
