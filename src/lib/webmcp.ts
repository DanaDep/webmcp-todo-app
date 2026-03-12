import { addTodo, toggleTodo, removeTodo, getTodos } from './todoStore.svelte';

export function registerWebMCPTools() {
  if (!('modelContext' in navigator)) {
    console.log('WebMCP not supported in this browser');
    return;
  }

  navigator.modelContext.registerTool({
    name: 'list_todos',
    description: 'List all todo items with their id, text, and done status',
    inputSchema: {
      type: 'object',
      properties: {},
    },
    annotations: { readOnlyHint: true },
    async execute() {
      const todos = getTodos();
      return {
        content: [{ type: 'text', text: JSON.stringify(todos) }],
      };
    },
  });

  navigator.modelContext.registerTool({
    name: 'add_todo',
    description: 'Add a new todo item',
    inputSchema: {
      type: 'object',
      properties: {
        text: { type: 'string', description: 'The todo text' },
      },
      required: ['text'],
    },
    async execute(input: { text: string }) {
      const todo = addTodo(input.text);
      return {
        content: [{ type: 'text', text: JSON.stringify(todo) }],
      };
    },
  });

  navigator.modelContext.registerTool({
    name: 'toggle_todo',
    description: 'Toggle a todo item between done and not done',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'number', description: 'The todo id to toggle' },
      },
      required: ['id'],
    },
    async execute(input: { id: number }) {
      const todo = toggleTodo(input.id);
      if (!todo) {
        return {
          content: [{ type: 'text', text: `Todo with id ${input.id} not found` }],
          isError: true,
        };
      }
      return {
        content: [{ type: 'text', text: JSON.stringify(todo) }],
      };
    },
  });

  navigator.modelContext.registerTool({
    name: 'delete_todo',
    description: 'Delete a todo item by id',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'number', description: 'The todo id to delete' },
      },
      required: ['id'],
    },
    async execute(input: { id: number }) {
      const removed = removeTodo(input.id);
      if (!removed) {
        return {
          content: [{ type: 'text', text: `Todo with id ${input.id} not found` }],
          isError: true,
        };
      }
      return {
        content: [{ type: 'text', text: `Todo ${input.id} deleted` }],
      };
    },
  });

  console.log('WebMCP tools registered: list_todos, add_todo, toggle_todo, delete_todo');
}
