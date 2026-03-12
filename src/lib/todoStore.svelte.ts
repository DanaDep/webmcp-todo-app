export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

let nextId = 1;
let todos = $state<Todo[]>([]);

export function addTodo(text: string): Todo {
  const todo: Todo = { id: nextId++, text, done: false };
  todos.push(todo);
  return todo;
}

export function toggleTodo(id: number): Todo | undefined {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.done = !todo.done;
  }
  return todo;
}

export function removeTodo(id: number): boolean {
  const len = todos.length;
  todos = todos.filter((t) => t.id !== id);
  return todos.length < len;
}

export function getTodos(): Todo[] {
  return todos;
}
