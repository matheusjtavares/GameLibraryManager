export enum GameStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  DROPPED = 'DROPPED',
}

export interface Game {
  id: number;
  title: string;
  platform: string;
  genre?: string;
  developer?: string;
  releaseYear?: number;
  status: GameStatus;
  rating?: number;
  notes?: string;
  coverUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GameCreateRequest {
  title: string;
  platform: string;
  genre?: string;
  developer?: string;
  releaseYear?: number;
  status: GameStatus;
  rating?: number;
  notes?: string;
  coverUrl?: string;
}

export interface GameUpdateRequest extends Partial<GameCreateRequest> {}

export interface StatsDTO {
  totalGames: number;
  countByStatus: Record<GameStatus, number>;
  averageRating: number;
}
