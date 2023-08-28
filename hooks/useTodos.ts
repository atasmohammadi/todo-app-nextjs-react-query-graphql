import { useQuery, useMutation, useQueryClient } from "react-query";
import { GraphQLClient } from "graphql-request";
import {
  GET_TODOS,
  CREATE_TODO,
  UPDATE_TODO,
  DELETE_TODO,
} from "../queries/queries";

const graphQLClient = new GraphQLClient("YOUR_GRAPHQL_API_URL");

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface CreateTodoInput {
  text: string;
  completed: boolean;
}

interface UpdateTodoInput {
  text?: string;
  completed?: boolean;
}

export function useTodos() {
  const queryClient = useQueryClient();

  const todosQuery = useQuery<Todo[]>("todos", async () => {
    const response = await graphQLClient.request(GET_TODOS);
    return response.todos;
  });

  const createTodoMutation = useMutation<Todo, unknown, CreateTodoInput>(
    async (newTodo) => {
      const variables = {
        input: {
          text: newTodo.text,
          completed: newTodo.completed,
        },
      };

      const response = await graphQLClient.request(CREATE_TODO, variables);
      return response.createTodo;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
      },
    }
  );

  const updateTodoMutation = useMutation<Todo, unknown, UpdateTodoInput>(
    async (updatedTodo) => {
      const variables = {
        id: updatedTodo.id,
        input: {
          text: updatedTodo.text,
          completed: updatedTodo.completed,
        },
      };

      const response = await graphQLClient.request(UPDATE_TODO, variables);
      return response.updateTodo;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
      },
    }
  );

  const deleteTodoMutation = useMutation<void, unknown, number>(
    async (todoId) => {
      const variables = {
        id: todoId,
      };

      await graphQLClient.request(DELETE_TODO, variables);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
      },
    }
  );

  return {
    todosQuery,
    createTodo: createTodoMutation.mutate,
    updateTodo: updateTodoMutation.mutate,
    deleteTodo: deleteTodoMutation.mutate,
  };
}
