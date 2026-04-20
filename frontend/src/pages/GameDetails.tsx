import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { gamesApi } from '../api/gamesApi';
import { Game, GameStatus } from '../types/game';
import { ArrowLeft, Star, Gamepad2, Tag, User, Calendar, FileText, Image as ImageIcon } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

const GameDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: game, isLoading, error } = useQuery<Game>({
    queryKey: ['game', id],
    queryFn: () => gamesApi.fetchById(Number(id!)),
  });

  const statusMutation = useMutation({
    mutationFn: (status: string) => gamesApi.updateStatus(Number(id!), status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['game', id] });
    },
  });

  const ratingMutation = useMutation({
    mutationFn: (rating: number) => gamesApi.updateRating(Number(id!), rating),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['game', id] });
    },
  });

  if (isLoading) return <div className="text-center py-10">Loading game details...</div>;
  if (error || !game) return <div className="text-center py-10 text-red-500">Game not found.</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-slate-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-3xl font-bold">Game Details</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            {game.coverUrl ? (
              <img src={game.coverUrl} alt={game.title} className="w-full h-auto rounded-lg shadow-sm" />
            ) : (
              <div className="aspect-[3/4] bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
                <ImageIcon className="w-12 h-12" />
              </div>
            )}
            <div className="mt-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-500">Status</span>
                <StatusBadge status={game.status} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-500">Rating</span>
                <div className="flex items-center gap-1 text-indigo-600 font-bold">
                  <Star className="w-4 h-4 fill-current" />
                  {game.rating || 'N/A'} / 10
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-4xl font-bold text-slate-900">{game.title}</h2>
              <Link 
                to={`/games/${game.id}/edit`} 
                className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/games/${game.id}/edit`); // For simplicity, using same form page
                }}
              >
                Edit Details
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center gap-3">
                <Gamepad2 className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500 uppercase font-semibold">Platform</p>
                  <p className="font-medium">{game.platform}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Tag className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500 uppercase font-semibold">Genre</p>
                  <p className="font-medium">{game.genre || 'Not specified'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500 uppercase font-semibold">Developer</p>
                  <p className="font-medium">{game.developer || 'Not specified'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500 uppercase font-semibold">Release Year</p>
                  <p className="font-medium">{game.releaseYear || 'Unknown'}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-700 font-semibold">
                <FileText className="w-5 h-5" />
                <h3>Notes</h3>
              </div>
              <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-100">
                {game.notes || 'No notes added for this game.'}
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-wrap gap-6">
             <div className="flex-grow space-y-3">
               <p className="text-sm font-medium text-slate-500">Quick Update Status</p>
               <div className="flex gap-2">
                 {Object.values(GameStatus).map(status => (
                   <button 
                     key={status}
                     onClick={() => statusMutation.mutate(status)}
                     className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                       game.status === status 
                       ? 'bg-indigo-600 text-white' 
                       : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                     }`}
                   >
                     {status.replace('_', ' ')}
                   </button>
                 ))}
               </div>
             </div>
             <div className="flex-grow space-y-3">
               <p className="text-sm font-medium text-slate-500">Quick Update Rating</p>
               <div className="flex gap-2">
                 {[1, 3, 5, 7, 9].map(rating => (
                   <button 
                     key={rating}
                     onClick={() => ratingMutation.mutate(rating)}
                     className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                       game.rating === rating 
                       ? 'bg-indigo-600 text-white' 
                       : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                     }`}
                   >
                     {rating}
                   </button>
                 ))}
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
