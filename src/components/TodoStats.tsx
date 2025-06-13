import React from 'react';
import { CheckCircle, Circle, AlertTriangle, BarChart3 } from 'lucide-react';

interface TodoStatsProps {
  stats: {
    total: number;
    completed: number;
    active: number;
    overdue: number;
  };
}

const TodoStats: React.FC<TodoStatsProps> = ({ stats }) => {
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="glass-effect rounded-xl p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-semibold text-gray-800">Progress Overview</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-2">
            <BarChart3 className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Tasks</div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800">{stats.completed}</div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mx-auto mb-2">
            <Circle className="w-6 h-6 text-yellow-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800">{stats.active}</div>
          <div className="text-sm text-gray-600">Active</div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-2">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800">{stats.overdue}</div>
          <div className="text-sm text-gray-600">Overdue</div>
        </div>
      </div>

      {stats.total > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Completion Rate</span>
            <span className="text-sm font-bold text-indigo-600">{completionRate}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoStats;