import React, { useState } from 'react';
import { Plus, Calendar, Tag, AlertCircle } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoFormProps {
  onAddTodo: (text: string, priority: Todo['priority'], category: string, dueDate?: Date) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Todo['priority']>('medium');
  const [category, setCategory] = useState('General');
  const [dueDate, setDueDate] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTodo(
        text,
        priority,
        category,
        dueDate ? new Date(dueDate) : undefined
      );
      setText('');
      setDueDate('');
      setShowAdvanced(false);
    }
  };

  const priorityColors = {
    low: 'text-green-600 bg-green-50 border-green-200',
    medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    high: 'text-red-600 bg-red-50 border-red-200',
  };

  return (
    <div className="glass-effect rounded-xl p-6 shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
          />
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="px-4 py-3 text-gray-500 hover:text-indigo-600 transition-colors duration-200"
            title="Advanced options"
          >
            <AlertCircle className="w-5 h-5" />
          </button>
          <button
            type="submit"
            disabled={!text.trim()}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 font-medium"
          >
            <Plus className="w-5 h-5" />
            Add
          </button>
        </div>

        {showAdvanced && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200 fade-in">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Tag className="w-4 h-4 inline mr-1" />
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Todo['priority'])}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${priorityColors[priority]}`}
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Tag className="w-4 h-4 inline mr-1" />
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g., Work, Personal"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default TodoForm;