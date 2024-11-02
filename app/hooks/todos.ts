import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ToDoRequest } from '../../types/todoProps';
import {
  createTodo,
  deleteTodo,
  fetchTodos,
  updateTodo,
} from '../services/todos-api';

export const useToDos = (userUid: string, folderId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: () => fetchTodos(userUid, folderId),
  });
  return { data, isLoading, error };
};

export const useCreateTodo = (newTodo: ToDoRequest) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => createTodo(newTodo),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });
};

export const useUpdateTodo = (
  userUid: string,
  todoId: string,
  newTodo: ToDoRequest
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => updateTodo(userUid, todoId, newTodo),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });
};

export const useDeleteTodo = (
  userUid: string,
  todoId: string,
  folderId: string
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteTodo(userUid, todoId, folderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
