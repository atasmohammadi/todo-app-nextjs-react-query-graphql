import React, { useState } from "react";

interface AddTodoFormProps {
  createTodo: (todo: { text: string; completed: boolean }) => void;
}

function AddTodoForm({ createTodo }: AddTodoFormProps) {
  const [text, setText] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (text.trim() !== "") {
      createTodo({ text, completed: false });
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter todo text"
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}

export default AddTodoForm;
