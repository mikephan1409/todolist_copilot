import React, { useState } from 'react';
import { Check, X, Edit2, Save, Calendar, Tag, AlertTriangle } from 'lucide-react';
import { Todo } from '../types/todo';
import { clsx } from 'clsx';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(todo.id, { text: editText.trim() });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const isOverdue = todo.dueDate && !todo.completed && todo.dueDate < new Date();
  const isDueSoon = todo.dueDate && !todo.completed && 
    todo.dueDate > new Date() && 
    todo.dueDate <= new Date(Date.now() + 24 * 60 * 60 * 1000);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  };

  return (
    <div className={clsx(
      'glass-effect rounded-lg p-4 todo-item',
      `priority-${todo.priority}`,
      todo.completed && 'opacity-75',
      isOverdue && 'bg-red-50 border-red-200',
      isDueSoon && 'bg-yellow-50 border-yellow-200'
    )}>
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggle(todo.id)}
          className={clsx(
            'flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 mt-0.5',
            todo.completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 hover:border-indigo-500'
          )}
        >
          {todo.completed && <Check className="w-4 h-4" />}
        </button>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSave();
                  if (e.key === 'Escape') handleCancel();
                }}
                className="flex-1 px-3 py-1 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                autoFocus
              />
              <button
                onClick={handleSave}
                className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors duration-200"
              >
                <Save className="w-4 h-4" />
              </button>
              <button
                onClick={handleCancel}
                className="p-1 text-gray-500 hover:bg-gray-50 rounded transition-colors duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between gap-2">
                <p className={clsx(
                  'text-gray-800 leading-relaxed',
                  todo.completed && 'completed-task'
                )}>
                  {todo.text}
                </p>
                <div className="flex gap-1 flex-shrink-0">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-1 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-all duration-200"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(todo.id)}
                    className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-all duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  <span>{todo.category}</span>
                </div>
                
                <div className={clsx(
                  'px-2 py-1 rounded-full text-xs font-medium',
                  todo.priority === 'high' && 'bg-red-100 text-red-700',
                  todo.priority === 'medium' && 'bg-yellow-100 text-yellow-700',
                  todo.priority === 'low' && 'bg-green-100 text-green-700'
                )}>
                  {todo.priority} priority
                </div>

                {todo.dueDate && (
                  <div className={clsx(
                    'flex items-center gap-1',
                    isOverdue && 'text-red-600',
                    isDueSoon && 'text-yellow-600'
                  )}>
                    {isOverdue && <AlertTriangle className="w-3 h-3" />}
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(todo.dueDate)}</span>
                    {isOverdue && <span className="font-medium">(Overdue)</span>}
                    {isDueSoon && <span className="font-medium">(Due Soon)</span>}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;