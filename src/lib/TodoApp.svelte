<script lang="ts">
  import { addTodo, toggleTodo, removeTodo, getTodos } from './todoStore.svelte';

  let newText = $state('');

  function handleAdd() {
    const trimmed = newText.trim();
    if (!trimmed) return;
    addTodo(trimmed);
    newText = '';
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') handleAdd();
  }
</script>

<div class="todo-app">
  <h1>Todo App</h1>

  <div class="todo-input">
    <input
      type="text"
      placeholder="What needs to be done?"
      bind:value={newText}
      onkeydown={handleKeydown}
    />
    <button onclick={handleAdd}>Add</button>
  </div>

  <ul class="todo-list">
    {#each getTodos() as todo (todo.id)}
      <li class:done={todo.done}>
        <input
          type="checkbox"
          checked={todo.done}
          onchange={() => toggleTodo(todo.id)}
        />
        <span>{todo.text}</span>
        <button class="delete" onclick={() => removeTodo(todo.id)}>✕</button>
      </li>
    {/each}
  </ul>
</div>

<style>
  .todo-app {
    max-width: 480px;
    margin: 2rem auto;
    font-family: system-ui, sans-serif;
  }

  h1 {
    text-align: center;
    font-weight: 300;
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }

  .todo-input {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .todo-input input {
    flex: 1;
    padding: 0.5rem 0.75rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .todo-input button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    background: #4a90d9;
    color: white;
  }

  .todo-list {
    list-style: none;
    padding: 0;
  }

  .todo-list li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0;
    border-bottom: 1px solid #eee;
  }

  .todo-list li span {
    flex: 1;
  }

  .todo-list li.done span {
    text-decoration: line-through;
    opacity: 0.5;
  }

  .delete {
    background: none;
    border: none;
    color: #e55;
    cursor: pointer;
    font-size: 1rem;
    padding: 0 0.25rem;
  }
</style>
