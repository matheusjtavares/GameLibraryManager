import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { gamesApi } from '../api/gamesApi';
import { Game, GameCreateRequest, GameStatus } from '../types/game';
import { ArrowLeft, Save } from 'lucide-react';

const GameForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEditMode = !!id;

  const { data: game, isLoading } = useQuery<Game>({
    queryKey: ['game', id],
    queryFn: () => gamesApi.fetchById(Number(id!)),
    enabled: isEditMode,
  });

  const [formData, setFormData] = useState<GameCreateRequest>({
    title: '',
    platform: '',
    genre: '',
    developer: '',
    releaseYear: undefined,
    status: GameStatus.NOT_STARTED,
    rating: undefined,
    notes: '',
    coverUrl: '',
  });

  React.useEffect(() => {
    if (game) {
      setFormData({
        title: game.title,
        platform: game.platform,
        genre: game.genre || '',
        developer: game.developer || '',
        releaseYear: game.releaseYear,
        status: game.status,
        rating: game.rating,
        notes: game.notes || '',
        coverUrl: game.coverUrl || '',
      });
    }
  }, [game]);

  const mutation = useMutation({
    mutationFn: (data: GameCreateRequest) => 
      isEditMode ? gamesApi.update(Number(id!), data) : gamesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['games'] });
      navigate('/library');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  if (isLoading) return <div className="text-center py-10">Loading game...</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-slate-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-3xl font-bold">{isEditMode ? 'Edit Game' : 'Add New Game'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Title *</label>
            <input 
              type="text" 
              required 
              className="w-full px-3 py-2 rounded-md border border-slate-300 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Platform *</label>
            <input 
              type="text" 
              required 
              className="w-full px-3 py-2 rounded-md border border-slate-300 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              value={formData.platform}
              onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Genre</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 rounded-md border border-slate-300 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              value={formData.genre}
              onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Developer</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 rounded-md border border-slate-300 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              value={formData.developer}
              onChange={(e) => setFormData({ ...formData, developer: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Release Year</label>
            <input 
              type="number" 
              className="w-full px-3 py-2 rounded-md border border-slate-300 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              value={formData.releaseYear || ''}
              onChange={(e) => setFormData({ ...formData, releaseYear: parseInt(e.target.value) || undefined })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Status</label>
            <select 
              className="w-full px-3 py-2 rounded-md border border-slate-300 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as GameStatus })}
            >
              <option value={GameStatus.NOT_STARTED}>Not Started</option>
              <option value={GameStatus.IN_PROGRESS}>In Progress</option>
              <option value={GameStatus.COMPLETED}>Completed</option>
              <option value={GameStatus.DROPPED}>Dropped</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Rating (0-10)</label>
            <input 
              type="number" 
              min="0" 
              max="10" 
              className="w-full px-3 py-2 rounded-md border border-slate-300 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              value={formData.rating || ''}
              onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) || undefined })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Cover URL</label>
            <input 
              type="url" 
              className="w-full px-3 py-2 rounded-md border border-slate-300 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              value={formData.coverUrl}
              onChange={(e) => setFormData({ ...formData, coverUrl: e.target.value })}
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Notes</label>
          <textarea 
            rows={4} 
            className="w-full px-3 py-2 rounded-md border border-slate-300 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />
        </div>
        <div className="flex justify-end gap-4 pt-4">
          <button 
            type="button" 
            onClick={() => navigate(-1)}
            className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={mutation.isPending}
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-500 transition-colors disabled:bg-indigo-300"
          >
            <Save className="w-4 h-4" />
            {mutation.isPending ? 'Saving...' : 'Save Game'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GameForm;
