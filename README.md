# 🎮 Game Library Manager

Game Library Manager is a full-stack web application designed to help you catalog, track, and organize your personal video game collection. Whether you're managing a massive backlog or just want to keep track of your favorites, this tool provides a clean, responsive interface for all your gaming data.

## ✨ Features

- **Game Cataloging:** Add your favorite games with titles, platforms, and cover art.
- **Play Status Tracking:** Keep track of your progress with statuses like *Not Started*, *In Progress*, *Completed*, or *Dropped*.
- **Rating System:** Rate your games on a scale of 1 to 5.
- **Dynamic Dashboard:** Get a quick overview of your collection with statistics on total games, completion rates, and average ratings.
- **Library Search & Filtering:** Quickly find games in your collection using the search bar and status filters.
- **Responsive Design:** Optimized for both desktop and mobile viewing with a modern, dark-themed UI.
- **Containerized Architecture:** Fully dockerized for easy deployment and consistent development environments.

## 🚀 Tech Stack

### Backend
- **Language:** Java 21
- **Framework:** Spring Boot 3.3.0
- **Persistence:** Spring Data JPA / Hibernate
- **Database:** PostgreSQL 16
- **Migration:** Flyway
- **Mapping:** MapStruct & Lombok
- **Testing:** JUnit 5, Testcontainers

### Frontend
- **Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **State Management:** TanStack Query (React Query)
- **Icons:** Lucide React
- **Routing:** React Router

### Infrastructure
- **Orchestration:** Docker Compose
- **Web Server:** Nginx (serving the React SPA)

## 🛠️ Getting Started

### Prerequisites
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd GameLibraryManager
   ```

2. **Launch the application using Docker Compose:**
   ```bash
   docker-compose up --build
   ```

3. **Access the services:**
   - **Frontend UI:** [http://localhost:3000](http://localhost:3000)
   - **Backend API:** [http://localhost:8080](http://localhost:8080)
   - **PostgreSQL:** `localhost:5433` (External port)

## 📁 Project Structure

```text
GameLibraryManager/
├── backend/            # Spring Boot application
│   ├── src/            # Java source code
│   ├── pom.xml         # Maven dependencies
│   └── Dockerfile      # Backend container definition
├── frontend/           # React application
│   ├── src/            # React components & logic
│   ├── package.json    # NPM dependencies
│   ├── nginx.conf      # Production server config
│   └── Dockerfile      # Frontend container definition
└── docker-compose.yml  # Multi-container orchestration
```

## 📡 API Overview

The backend exposes a RESTful JSON API at `/api/v1`:

- `GET /api/v1/games`: Retrieve all games (supports search and status filters).
- `GET /api/v1/games/{id}`: Get details for a specific game.
- `POST /api/v1/games`: Add a new game to the library.
- `PUT /api/v1/games/{id}`: Update an existing game.
- `DELETE /api/v1/games/{id}`: Remove a game from the library.
- `GET /api/v1/stats`: Retrieve library statistics (count, completion status, etc.).

## 🗺️ Future Roadmap

- [ ] **Authentication:** Implement multi-user support and secure authentication.
- [ ] **Third-party Integration:** Integrate with external game databases (IGDB or RAWG) for automatic metadata fetching.
- [ ] **Observability:** Add Prometheus and Grafana for monitoring application health and metrics.
- [ ] **Kubernetes:** Provide Helm charts and Kubernetes manifests for production-grade orchestration.
- [ ] **Unit & Integration Testing:** Expand test coverage for both backend and frontend components.

## 📝 License

This project is licensed under the MIT License.
