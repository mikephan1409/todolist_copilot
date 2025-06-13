import React from 'react';
import { useTodos } from '../hooks/useTodos';
import Header from './Header';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoFilters from './TodoFilters';
import TodoStats from './TodoStats';

const TodoApp: React.FC = () => {
  const {
    todos,
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
  } = useTodos();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Header />
      
      <div className="space-y-6">
        <TodoForm onAddTodo={addTodo} />
        
        <TodoFilters
          filter={filter}
          setFilter={setFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onClearCompleted={clearCompleted}
          hasCompleted={stats.completed > 0}
        />
        
        <TodoStats stats={stats} />
        
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onUpdate={updateTodo}
        />
        
        {todos.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No todos yet
            </h3>
            <p className="text-gray-500">
              Add your first task above to get started!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoApp;