import axios from 'axios';
import { Game, GameCreateRequest, GameUpdateRequest, StatsDTO } from '../types/game';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api/v1';

const api = axios.create({
  baseURL: API_BASE,
});

export const gamesApi = {
  fetchAll: (params?: { status?: string; platform?: string; q?: string }) => 
    api.get<Game[]>('/games', { params }).then(res => res.data),
    
  fetchById: (id: number) => 
    api.get<Game>(`/games/${id}`).then(res => res.data),
    
  create: (data: GameCreateRequest) => 
    api.post<Game>('/games', data).then(res => res.data),
    
  update: (id: number, data: GameUpdateRequest) => 
    api.put<Game>(`/games/${id}`, data).then(res => res.data),
    
  updateStatus: (id: number, status: string) => 
    api.patch<Game>(`/games/${id}/status`, { status }).then(res => res.data),
    
  updateRating: (id: number, rating: number) => 
    api.patch<Game>(`/games/${id}/rating`, { rating }).then(res => res.data),
    
  delete: (id: number) => 
    api.delete(`/games/${id}`).then(res => res.data),
    
  fetchStats: () => 
    api.get<StatsDTO>('/stats').then(res => res.data),
};
