import { gql } from "graphql-request";

// Get all todos
export const GET_TODOS = gql`
  query {
    todos {
      id
      text
      completed
    }
  }
`;

// Create a new todo
export const CREATE_TODO = gql`
  mutation CreateTodo($input: CreateTodoInput!) {
    createTodo(input: $input) {
      id
      text
      completed
    }
  }
`;

// Update an existing todo
export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID!, $input: UpdateTodoInput!) {
    updateTodo(id: $id, input: $input) {
      id
      text
      completed
    }
  }
`;

// Delete a todo
export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;
