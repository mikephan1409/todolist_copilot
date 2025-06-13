import React from 'react';
import { Todo } from '../types/todo';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete, onUpdate }) => {
  return (
    <div className="space-y-3">
      {todos.map((todo, index) => (
        <div
          key={todo.id}
          className="slide-in"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <TodoItem
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        </div>
      ))}
    </div>
  );
};

export default TodoList;