import React from 'react';
import { CheckSquare } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-4">
        <CheckSquare className="w-8 h-8 text-indigo-600" />
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Todo List
        </h1>
      </div>
      <p className="text-gray-600 text-lg">
        Stay organized and boost your productivity
      </p>
    </header>
  );
};

export default Header;