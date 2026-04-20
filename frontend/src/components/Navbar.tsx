import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2 } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-slate-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <Gamepad2 className="w-6 h-6 text-indigo-400" />
          <span>GameLib Manager</span>
        </Link>
        <div className="flex gap-6">
          <Link to="/" className="hover:text-indigo-400 transition-colors">Dashboard</Link>
          <Link to="/library" className="hover:text-indigo-400 transition-colors">Library</Link>
          <Link to="/games/new" className="bg-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-500 transition-colors">
            + Add Game
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
