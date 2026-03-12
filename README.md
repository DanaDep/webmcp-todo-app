# WebMCP Todo App

A simple todo app built with Svelte 5 + TypeScript + Vite that exposes its functionality as [WebMCP](https://webmachinelearning.github.io/webmcp/) tools, making it browser-agent ready.

## What is WebMCP?

WebMCP lets websites declare structured tools that AI agents can discover and call via `navigator.modelContext`. Instead of scraping the DOM, agents interact with your app through a clean, typed API.

## Exposed Tools

| Tool | Description |
|------|-------------|
| `list_todos` | Returns all todos (read-only) |
| `add_todo` | Adds a new todo item |
| `toggle_todo` | Toggles a todo's done state |
| `delete_todo` | Removes a todo by id |

## Project Structure

```
src/
├── main.ts                  # App entry + WebMCP init
├── App.svelte               # Root component
├── lib/
│   ├── todoStore.svelte.ts  # Shared reactive state
│   ├── TodoApp.svelte       # UI component
│   └── webmcp.ts            # WebMCP tool registration
```

Both the UI and WebMCP tools share the same store — when an agent calls a tool, the UI updates in real time.

## Getting Started

```bash
npm install
npm run dev
```

## Testing WebMCP Tools

**Option A — Chrome 146 Canary:**
1. Enable "WebMCP for testing" at `chrome://flags`
2. Install the Model Context Tool Inspector extension
3. Open the app and use the inspector to invoke tools

**Option B — Any browser with polyfill:**
Uncomment the polyfill script in `index.html`, then test from the dev console:
```js
await navigator.modelContext.callTool({ name: 'add_todo', arguments: { text: 'Buy groceries' } })
```
