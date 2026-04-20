CREATE TABLE games (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    platform VARCHAR(80) NOT NULL,
    genre VARCHAR(80),
    developer VARCHAR(120),
    release_year INTEGER,
    status VARCHAR(20) NOT NULL DEFAULT 'NOT_STARTED',
    rating INTEGER CHECK (rating >= 0 AND rating <= 10),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_games_title ON games(title);
CREATE INDEX idx_games_platform ON games(platform);
CREATE INDEX idx_games_status ON games(status);
