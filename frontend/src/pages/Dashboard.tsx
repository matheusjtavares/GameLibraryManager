import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { gamesApi } from '../api/gamesApi';
import { StatsDTO, GameStatus } from '../types/game';
import { LayoutDashboard, Gamepad2, CheckCircle, PlayCircle, XCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { data: stats, isLoading, error } = useQuery<StatsDTO>({
    queryKey: ['stats'],
    queryFn: gamesApi.fetchStats,
  });

  if (isLoading) return <div className="text-center py-10">Loading stats...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error loading stats.</div>;

  const statCards = [
    { 
      label: 'Total Games', 
      value: stats?.totalGames || 0, 
      icon: <Gamepad2 className="w-6 h-6" />, 
      color: 'bg-indigo-100 text-indigo-600' 
    },
    { 
      label: 'Completed', 
      value: stats?.countByStatus[GameStatus.COMPLETED] || 0, 
      icon: <CheckCircle className="w-6 h-6" />, 
      color: 'bg-green-100 text-green-600' 
    },
    { 
      label: 'In Progress', 
      value: stats?.countByStatus[GameStatus.IN_PROGRESS] || 0, 
      icon: <PlayCircle className="w-6 h-6" />, 
      color: 'bg-blue-100 text-blue-600' 
    },
    { 
      label: 'Dropped', 
      value: stats?.countByStatus[GameStatus.DROPPED] || 0, 
      icon: <XCircle className="w-6 h-6" />, 
      color: 'bg-red-100 text-red-600' 
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <LayoutDashboard className="w-8 h-8 text-indigo-600" />
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
            <div className={`p-3 rounded-lg ${card.color}`}>
              {card.icon}
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">{card.label}</p>
              <p className="text-2xl font-bold">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-semibold mb-4">Overall Quality</h2>
        <div className="flex items-center gap-4">
          <div className="text-4xl font-bold text-indigo-600">
            {stats?.averageRating ? stats.averageRating.toFixed(1) : 'N/A'}
          </div>
          <div className="text-slate-500">Average Rating (0-10)</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
