import { ToDoRequest } from '../../types/todoProps';
import { API_URL } from './api';

export const fetchTodos = async (userUid: string, folderId: string) => {
  try {
    const response = await fetch(`${API_URL}/get-todos/${userUid}&${folderId}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar listas');
    }

    return response.json();
  } catch (error) {
    console.log('Erro na requisição:', error);
    throw error;
  }
};
export const createTodo = async (newTodo: ToDoRequest) => {
  const response = await fetch(`${API_URL}/create-todo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTodo),
  });
  if (!response.ok) {
    throw new Error('Erro ao criar lista');
  }
  return response.json();
};
export const updateTodo = async (
  userUid: string,
  todoId: string,
  toDo: ToDoRequest
) => {
  const response = await fetch(`${API_URL}/update-todo/${userUid}&${todoId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(toDo),
  });
  if (!response.ok) {
    throw new Error('Erro ao atualizar lista');
  }
  return response.json();
};
export const deleteTodo = async (
  userUid: string,
  todoId: string,
  folderId: string
) => {
  const response = await fetch(
    `${API_URL}/delete-folder/${userUid}&${todoId}&${folderId}`,
    {
      method: 'DELETE',
    }
  );
  if (!response.ok) {
    throw new Error('Erro ao excluir lista');
  }
  return response.json();
};
