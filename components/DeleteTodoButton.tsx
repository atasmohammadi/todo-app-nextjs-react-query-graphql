import React from "react";

interface DeleteTodoButtonProps {
  todoId: number;
  deleteTodo: (todoId: number) => void;
}

function DeleteTodoButton({ todoId, deleteTodo }: DeleteTodoButtonProps) {
  const handleDelete = () => {
    deleteTodo(todoId);
  };

  return <button onClick={handleDelete}>Delete</button>;
}

export default DeleteTodoButton;
