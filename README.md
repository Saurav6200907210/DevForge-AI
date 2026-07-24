<div align="center">
  <img src="./public/landingpage.png" alt="DevForge AI Hero" width="800"/>

  # 🚀 DevForge AI
  **Developer Career Intelligence Platform**

  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
  [![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
  [![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

  *A premium, production-level, full-stack SaaS platform designed to accelerate developer careers through AI.*
</div>

---

## ✨ Overview

DevForge AI deeply analyzes your GitHub repositories, coding frequency, DevOps footprint, and documentation quality. It dynamically generates ATS-optimized resumes, creates professional portfolio websites, calculates job description match scorecards, and prepares technical interview guides.

### 📸 Features Preview

| Portfolio Builder | AI Resume Builder | Repository Analytics |
| :---: | :---: | :---: |
| <img src="./public/portfilio.png" width="250"/> | <img src="./public/airesumerbuilder.png" width="250"/> | <img src="./public/repositoryanalytic.png" width="250"/> |

---

## 🏗️ Architecture Flow

Here is the colorful high-level architecture diagram showing how the frontend, backend, database, and AI interact.

```mermaid
graph TD
    %% Colorful Styling
    classDef frontend fill:#3b82f6,stroke:#1d4ed8,stroke-width:3px,color:#fff,rx:10px,ry:10px;
    classDef backend fill:#10b981,stroke:#047857,stroke-width:3px,color:#fff,rx:10px,ry:10px;
    classDef database fill:#f59e0b,stroke:#b45309,stroke-width:3px,color:#fff,rx:10px,ry:10px;
    classDef aibox fill:#8b5cf6,stroke:#5b21b6,stroke-width:3px,color:#fff,rx:10px,ry:10px;
    classDef user fill:#ef4444,stroke:#b91c1c,stroke-width:3px,color:#fff,rx:100px,ry:100px;

    User((🧑‍💻 Developer)):::user
    Client[💻 Web Client<br/>React + Vite]:::frontend
    Gateway[🌐 API Gateway<br/>Express.js]:::backend
    
    subgraph Core Services
        Auth[🔐 Auth Service]:::backend
        Analysis[🧠 GitHub Analyzer]:::backend
        ResumeGen[📄 AI Resume Generator]:::backend
        PortfolioGen[🚀 Portfolio Builder]:::backend
    end

    DB[(💾 Local JSON DB<br/>db.json)]:::database
    Gemini[🤖 Google Gemini AI<br/>Expert Engine]:::aibox

    User -->|Interacts| Client
    Client -->|HTTP REST| Gateway
    Gateway --> Auth
    Gateway --> Analysis
    Gateway --> ResumeGen
    Gateway --> PortfolioGen

    Auth <--> DB
    Analysis <--> DB
    ResumeGen <--> DB
    PortfolioGen <--> DB

    Analysis -.->|GitHub API Data| Gemini
    ResumeGen -.->|Prompts + Data| Gemini
    Gemini -.->|AI Insights| Analysis
```

---

## 🛠️ Technology Stack

- **Frontend**: React + TypeScript, Vite, Tailwind CSS, Framer Motion, pure SVG animated visualizers (Doughnut dial, skills graph, heatmaps).
- **Backend**: Node.js + Express.js, fs-extra SQLite-like local persistence engine (`data/db.json`), axios integrations.
- **Docker Support**: Individual multi-stage Dockerfiles and dynamic orchestrator (`docker-compose.yml`).
- **AI Integrations**: Ready for Google Gemini API, with a robust local expert rule-based AI engine fallback guaranteeing 100% uptime.

---

## 📂 Codebase Architecture

```text
📦 DevForge AI
├── 📂 backend
│   ├── 📂 data
│   │   └── 📄 db.json               # Local JSON Database
│   ├── 📂 routes
│   │   ├── 📄 auth.js               # Auth & registration API
│   │   ├── 📄 analyze.js            # GitHub Intelligence & AI generation
│   │   ├── 📄 resumes.js            # Resume updates & Job comparator
│   │   └── 📄 portfolios.js         # Portfolios & Deploy logs simulator
│   ├── 📄 .env                      # API keys & ports
│   ├── 📄 db.js                     # Local database controllers
│   ├── 📄 server.js                 # Express server boots
│   └── 🐳 Dockerfile                # Backend container script
├── 📂 frontend
│   ├── 📂 src
│   │   ├── 📂 components
│   │   │   ├── 📄 LandingPage.tsx   # Premium dark-mode signup
│   │   │   ├── 📄 Dashboard.tsx     # SaaS command center
│   │   │   ├── 📄 ResumeEditor.tsx  # Interactive resume builder & PDF export
│   │   │   ├── 📄 LivePreview.tsx   # Browser portfolio simulator & Vercel builds
│   │   │   └── 📄 CustomChart.tsx   # Custom animated SVG graphs
│   │   ├── 📄 App.tsx               # Session gate controller
│   │   ├── 📄 api.ts                # Unified Axios REST client
│   │   ├── 📄 index.css             # Tailwind rules & glassmorphic custom layers
│   │   └── 📄 main.tsx              # React mounting root
│   ├── 📄 index.html                # Google Fonts & SEO tags
│   ├── 📄 tailwind.config.js        # Accent neon palettes
│   └── 🐳 Dockerfile                # Production Nginx multi-stage build script
├── 🐳 docker-compose.yml            # Container orchestration mapping
├── 📄 package.json                  # Monorepo concurrent scripts
└── 🚀 start-all.js                  # Cross-platform startup bootstrapper
```

---

## ⚡ Setup & Run

### Option A: Standard Local Run (Recommended)

1. **Install all dependencies**:
   ```bash
   npm run install-all
   ```
2. **Launch the ecosystem**:
   ```bash
   npm run dev
   ```
3. **Open the browser**:
   - Web Client: [http://localhost:5173](http://localhost:5173)
   - API Backend: [http://localhost:5000](http://localhost:5000)

### Option B: Docker Containers

To spin up both applications in isolated sandboxes:
```bash
docker-compose up --build
```
- Client App: [http://localhost:5173](http://localhost:5173)
- API Services: [http://localhost:5000](http://localhost:5000)

---

## 📡 REST API Reference

### 🔐 Authentication (`/api/auth`)
- `POST /login` - Dynamic login/registration; auto-creates user profiles upon first GitHub link.
- `GET /profile/:github` - Retrieves hydrated user stats.

### 🧠 GitHub Analysis (`/api/analyze`)
- `POST /` - GitHub Deep Intelligence Engine pulls public repository metadata and triggers Gemini/Mock AI to construct resumes and portfolios.

### 📄 AI Resumes (`/api/resumes`)
- `PUT /:id` - Saves customized resume content.
- `POST /:id/improve` - Suggests structural improvements and optimizes text blocks with AI.
- `POST /:id/match-job` - Pastes any target Job Description, returning match score metrics, missing tech list, and custom roadmap projects.

### 🌐 Portfolios (`/api/portfolios`)
- `PUT /:id` - Saves layout customization.
- `POST /:id/deploy` - Simulates a Vercel deploy, streaming live terminal build logs.
- `POST /:id/push-repo` - Simulates Git repository push operations.

<br/>
<div align="center">
  Built with ❤️ for Developers
</div>
