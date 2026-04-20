import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { gamesApi } from '../api/gamesApi';
import { Game } from '../types/game';
import StatusBadge from '../components/StatusBadge';
import { Search, Filter, Trash2, Edit3 } from 'lucide-react';

const Library: React.FC = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [platform, setPlatform] = useState('');
  const [status, setStatus] = useState('');

  const { data: games, isLoading, error } = useQuery<Game[]>({
    queryKey: ['games', search, platform, status],
    queryFn: () => gamesApi.fetchAll({ q: search || undefined, platform: platform || undefined, status: status || undefined }),
  });

  const deleteMutation = useMutation({
    mutationFn: gamesApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['games'] });
    },
  });

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this game?')) {
      await deleteMutation.mutateAsync(id);
    }
  };

  if (isLoading) return <div className="text-center py-10">Loading library...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error loading games.</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Game Library</h1>
        <Link to="/games/new" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 transition-colors">
          + Add Game
        </Link>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-wrap gap-4">
        <div className="flex-grow flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-md border border-slate-200">
          <Search className="w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search games..." 
            className="bg-transparent border-none outline-none w-full text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select 
            className="bg-slate-100 px-3 py-2 rounded-md border border-slate-200 text-sm outline-none"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            <option value="">All Platforms</option>
            <option value="PC">PC</option>
            <option value="PS5">PS5</option>
            <option value="Switch">Switch</option>
            <option value="Xbox">Xbox</option>
          </select>
          <select 
            className="bg-slate-100 px-3 py-2 rounded-md border border-slate-200 text-sm outline-none"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="NOT_STARTED">Not Started</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="DROPPED">Dropped</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Title</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Platform</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Rating</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {games?.map((game) => (
              <tr key={game.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium">{game.title}</td>
                <td className="px-6 py-4 text-slate-600 text-sm">{game.platform}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={game.status} />
                </td>
                <td className="px-6 py-4 text-slate-600 text-sm">
                  {game.rating ? `${game.rating}/10` : 'N/A'}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Link to={`/games/${game.id}`} className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                      <Edit3 className="w-4 h-4" />
                    </Link>
                    <button 
                      onClick={() => handleDelete(game.id)}
                      className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {games?.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-slate-500">
                  No games found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Library;
