import React from "react";
import TodoList from "../components/TodoList";
import AddTodoForm from "../components/AddTodoForm";
import { useTodos } from "../hooks/useTodos";
import styles from "./page.module.css";

function Home() {
  const { todosQuery, createTodo, updateTodo, deleteTodo } = useTodos();

  if (todosQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (todosQuery.isError) {
    return <div>Error: {todosQuery.error.message}</div>;
  }

  return (
    <main className={styles.main}>
      <h1>Todo App</h1>
      <AddTodoForm createTodo={createTodo} />
      <TodoList
        todos={todosQuery.data}
        updateTodo={updateTodo}
        deleteTodo={deleteTodo}
      />
    </main>
  );
}

export default Home;
