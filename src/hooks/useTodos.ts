import { useState, useEffect } from 'react';
import { Todo, FilterType, SortType } from '../types/todo';

const STORAGE_KEY = 'todolist-copilot-todos';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('created');
  const [searchTerm, setSearchTerm] = useState('');

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem(STORAGE_KEY);
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos).map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
        }));
        setTodos(parsedTodos);
      } catch (error) {
        console.error('Error loading todos from localStorage:', error);
      }
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string, priority: Todo['priority'] = 'medium', category: string = 'General', dueDate?: Date) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      priority,
      category,
      createdAt: new Date(),
      dueDate,
    };
    setTodos(prev => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const updateTodo = (id: string, updates: Partial<Todo>) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, ...updates } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  // Filter and sort todos
  const filteredAndSortedTodos = todos
    .filter(todo => {
      // Apply filter
      if (filter === 'active' && todo.completed) return false;
      if (filter === 'completed' && !todo.completed) return false;
      
      // Apply search
      if (searchTerm && !todo.text.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !todo.category.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'dueDate':
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return a.dueDate.getTime() - b.dueDate.getTime();
        case 'alphabetical':
          return a.text.localeCompare(b.text);
        case 'created':
        default:
          return b.createdAt.getTime() - a.createdAt.getTime();
      }
    });

  const stats = {
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    active: todos.filter(todo => !todo.completed).length,
    overdue: todos.filter(todo => 
      !todo.completed && 
      todo.dueDate && 
      todo.dueDate < new Date()
    ).length,
  };

  return {
    todos: filteredAndSortedTodos,
    filter,
    setFilter,
    sortBy,
    setSortBy,
    searchTerm,
    setSearchTerm,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    clearCompleted,
    stats,
  };
};