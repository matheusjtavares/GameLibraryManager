import React from 'react';
import { GameStatus } from '../types/game';

interface StatusBadgeProps {
  status: GameStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const colors: Record<GameStatus, string> = {
    NOT_STARTED: 'bg-slate-200 text-slate-700',
    IN_PROGRESS: 'bg-blue-100 text-blue-700',
    COMPLETED: 'bg-green-100 text-green-700',
    DROPPED: 'bg-red-100 text-red-700',
  };

  const labels: Record<GameStatus, string> = {
    NOT_STARTED: 'Not Started',
    IN_PROGRESS: 'In Progress',
    COMPLETED: 'Completed',
    DROPPED: 'Dropped',
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
      {labels[status]}
    </span>
  );
};

export default StatusBadge;
