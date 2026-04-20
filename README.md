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
- **Orchestration:** Docker Compose / Kubernetes (Minikube)
- **Web Server:** Nginx (serving the React SPA)

## 🛠️ Getting Started

### Prerequisites
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Minikube](https://minikube.sigs.k8s.io/docs/start/) (for Kubernetes deployment)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd GameLibraryManager
   ```

2. **Environment Configuration:**
   The project uses a `.env` file for sensitive credentials which is not included in the repository. Create a `.env` file in the root directory with the following default values:
   ```env
   DB_USER=gameuser
   DB_PASS=secret
   POSTGRES_DB=gamelib
   ```

3. **Option A: Launch using Docker Compose (Quick Start):**
   ```bash
   docker-compose up --build
   ```
   - **Frontend UI:** [http://localhost:3000](http://localhost:3000)
   - **Backend API:** [http://localhost:8080](http://localhost:8080)
   - **PostgreSQL:** `localhost:5433`

4. **Option B: Deploy to Kubernetes (via Minikube):**
   ```bash
   # 1. Create the namespace
   kubectl create namespace gamelibrarymanager

   # 2. Configure Secrets
   # The secrets.yaml file is excluded from the repo for security.
   # Use secrets.yaml.template as a guide to create your own secrets.yaml.
   # Values must be Base64 encoded (e.g., echo -n 'mysecret' | base64).
   cd k8s
   cp secrets.yaml.template secrets.yaml
   # Edit secrets.yaml with your base64 encoded values

   # 3. Apply the configuration
   kubectl apply -f secrets.yaml -n gamelibrarymanager
   kubectl apply -f . -n gamelibrarymanager

   # 4. Access the services
   minikube service ui -n gamelibrarymanager
   minikube service api -n gamelibrarymanager
   ```
   *Note: You can also run `minikube service --all -n gamelibrarymanager` to see all available services.*

### 📊 Monitoring Setup (Prometheus & Grafana)

To monitor your application health and metrics in Kubernetes:

1. **Create the monitoring namespace:**
   ```bash
   kubectl create namespace monitoring
   ```

2. **Deploy the monitoring stack:**
   ```bash
   # Apply deployments, config, and RBAC
   kubectl apply -f k8s/monitoring/
   
   # Explicitly apply services to ensure they are created in the correct namespace
   kubectl apply -f k8s/monitoring/services.yaml
   ```

3. **Access the monitoring tools:**
   - **Prometheus:** [http://localhost:30090](http://localhost:30090) (or use `minikube service prometheus-service -n monitoring`)
   - **Grafana:** [http://localhost:30300](http://localhost:30300) (or use `minikube service grafana-service -n monitoring`)

4. **Configure Grafana Data Source:**
   - Log in to Grafana (default: `admin`/`admin`).
   - Go to **Connections** -> **Data Sources**.
   - Add **Prometheus**.
   - Set URL to: `http://prometheus-service.monitoring.svc.cluster.local:9090`.
   - Click **Save & Test**.

> **💡 Troubleshooting:** If you encounter "port already allocated" errors, ensure no monitoring services are running in the `default` namespace:
> `kubectl delete svc prometheus-service grafana-service -n default`
   

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
- [ ] **Unit & Integration Testing:** Expand test coverage for both backend and frontend components.

## 📝 License

This project is licensed under the MIT License.
