import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import { ToDoRequest, ToDoResponse } from '../../types/todoProps';

type ChildrenProps = {
  children: ReactNode;
};

interface ITodoContext {
  todoSelected: ToDoResponse | null;
  setTodoSelected: Dispatch<SetStateAction<ToDoResponse | null>>;
  todos: ToDoResponse[] | null;
  setTodos: Dispatch<SetStateAction<ToDoResponse[] | null>>;
  newTodo: ToDoRequest | null;
  setNewTodo: Dispatch<SetStateAction<ToDoRequest | null>>;
}
const initialdata = {
  todoSelected: null,
  setTodoSelected: () => {},
  todos: null,
  setTodos: () => {},
  newTodo: null,
  setNewTodo: () => {},
};

export const TodoContext = createContext<ITodoContext>(initialdata);

export const TodoProvider = ({ children }: ChildrenProps) => {
  const [todoSelected, setTodoSelected] = useState<ToDoResponse | null>(
    initialdata.todoSelected
  );
  const [todos, setTodos] = useState<ToDoResponse[] | null>(initialdata.todos);
  const [newTodo, setNewTodo] = useState<ToDoRequest | null>(
    initialdata.newTodo
  );

  return (
    <TodoContext.Provider
      value={{
        todoSelected,
        setTodoSelected,
        todos,
        setTodos,
        newTodo,
        setNewTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
