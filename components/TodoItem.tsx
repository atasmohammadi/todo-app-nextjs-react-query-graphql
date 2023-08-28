import React from "react";
import DeleteTodoButton from "./DeleteTodoButton";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  updateTodo: (todo: Todo) => void;
}

function TodoItem({ todo, updateTodo }: TodoItemProps) {
  const handleToggleComplete = () => {
    updateTodo({ ...todo, completed: !todo.completed });
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggleComplete}
      />
      <span>{todo.text}</span>
      <DeleteTodoButton todoId={todo.id} />
    </div>
  );
}

export default TodoItem;
