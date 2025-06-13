import React from 'react';
import { Search, Filter, ArrowUpDown, Trash2 } from 'lucide-react';
import { FilterType, SortType } from '../types/todo';
import { clsx } from 'clsx';

interface TodoFiltersProps {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  sortBy: SortType;
  setSortBy: (sort: SortType) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onClearCompleted: () => void;
  hasCompleted: boolean;
}

const TodoFilters: React.FC<TodoFiltersProps> = ({
  filter,
  setFilter,
  sortBy,
  setSortBy,
  searchTerm,
  setSearchTerm,
  onClearCompleted,
  hasCompleted,
}) => {
  const filterOptions: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
  ];

  const sortOptions: { value: SortType; label: string }[] = [
    { value: 'created', label: 'Date Created' },
    { value: 'priority', label: 'Priority' },
    { value: 'dueDate', label: 'Due Date' },
    { value: 'alphabetical', label: 'Alphabetical' },
  ];

  return (
    <div className="glass-effect rounded-xl p-4 shadow-lg">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search todos..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
          />
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={clsx(
                'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                filter === option.value
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-gray-500" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortType)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Clear completed */}
        {hasCompleted && (
          <button
            onClick={onClearCompleted}
            className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 text-sm font-medium"
          >
            <Trash2 className="w-4 h-4" />
            Clear Completed
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoFilters;