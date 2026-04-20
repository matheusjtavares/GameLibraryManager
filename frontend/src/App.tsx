import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Library from './pages/Library';
import GameForm from './pages/GameForm';
import GameDetails from './pages/GameDetails';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/library" element={<Library />} />
          <Route path="/games/new" element={<GameForm />} />
          <Route path="/games/:id" element={<GameDetails />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
