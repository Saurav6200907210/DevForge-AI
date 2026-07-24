<div align="center">

<img src="./public/landingpage.png" alt="DevForge AI Banner" width="100%"/>

# 🚀 DevForge AI

### AI-Powered Developer Career Intelligence Platform

<p align="center">

<img src="https://img.shields.io/badge/Version-1.0-blue?style=for-the-badge"/>
<img src="https://img.shields.io/badge/Status-Production-success?style=for-the-badge"/>
<img src="https://img.shields.io/badge/Open%20Source-Yes-brightgreen?style=for-the-badge"/>
<img src="https://img.shields.io/github/license/Saurav6200907210/DevForge-AI?style=for-the-badge"/>
<img src="https://img.shields.io/github/stars/Saurav6200907210/DevForge-AI?style=for-the-badge"/>
<img src="https://img.shields.io/github/forks/Saurav6200907210/DevForge-AI?style=for-the-badge"/>
<img src="https://img.shields.io/github/issues/Saurav6200907210/DevForge-AI?style=for-the-badge"/>
<img src="https://img.shields.io/github/last-commit/Saurav6200907210/DevForge-AI?style=for-the-badge"/>

</p>

---

### 💻 Built With

<p align="center">

<img src="https://skillicons.dev/icons?i=react,typescript,nodejs,express,vite,tailwind,docker,github,git,vscode&perline=10"/>

</p>

---

### 🌟 Overview

**DevForge AI** is a modern **AI-powered Full Stack Developer Intelligence Platform**
that analyzes GitHub profiles, evaluates repositories, generates ATS-friendly resumes,
creates professional developer portfolios, provides repository insights, and helps developers
become job-ready through AI-driven recommendations.

Designed with a production-ready architecture using **React, TypeScript, Node.js, Express,
Docker, Tailwind CSS, and Google Gemini AI**, DevForge AI provides everything a developer
needs to build an impressive professional presence.

</div>

---

# ✨ Features

## 🤖 AI Powered

- 🧠 AI GitHub Repository Analysis
- 📄 AI Resume Builder
- 🌐 AI Portfolio Generator
- 🎯 ATS Resume Optimization
- 💼 Job Description Match Score
- 🛣 Personalized Career Roadmap
- 📈 AI Skill Analysis
- ⚡ Smart Recommendations

---

## 📊 Analytics

- GitHub Repository Insights
- Commit Activity
- Repository Health Score
- Code Quality Analysis
- Language Distribution
- Technology Detection
- Contribution Statistics
- Open Source Score

---

## 👨‍💻 Developer Tools

- Resume Editor
- Portfolio Builder
- Repository Explorer
- Career Dashboard
- Profile Management
- Skill Timeline
- Progress Tracking
- Deployment Simulator

---

## 🚀 Production Features

- Authentication System
- REST API
- Docker Support
- Responsive Design
- Dark Mode UI
- Modern Dashboard
- Modular Architecture
- AI Integration
- Local Database
- API Driven Design

---

# 📸 Application Preview

<div align="center">

## 🌍 Landing Page

<img src="./public/landingpage.png" width="900"/>

Modern SaaS landing page with glassmorphism UI and responsive layout.

---

## 👨‍💻 Developer Dashboard

<img src="./public/developerprofile.png" width="900"/>

Personalized dashboard showing developer statistics, skills and AI insights.

---

## 📊 Advanced Analytics Dashboard

<img src="./public/developerprofile2.png" width="900"/>

Detailed GitHub analytics, repository metrics and career intelligence.

---

## 📁 Repository Explorer

<img src="./public/repositoryExplorer.png" width="900"/>

Explore repositories with technology stack, activity and health metrics.

---

## 📈 Repository Analytics

<img src="./public/repositoryanalytic.png" width="900"/>

AI-powered repository analysis with performance indicators and recommendations.

---

## 📄 AI Resume Builder

<img src="./public/airesumerbuilder.png" width="900"/>

Automatically generate ATS-friendly professional resumes using AI.

---

## 🌐 Portfolio Builder

<img src="./public/portfilio.png" width="900"/>

Generate beautiful developer portfolios in seconds.

---

## 🎯 Career Timeline

<img src="./public/milestonetimeline.png" width="900"/>

Visual roadmap helping developers reach their career goals.

</div>

---

# 🛠 Tech Stack

| Category | Technologies |
|-----------|--------------|
| Frontend | React, TypeScript, Vite, Tailwind CSS |
| Backend | Node.js, Express.js |
| AI | Google Gemini AI |
| Database | Local JSON Database |
| API | REST API |
| Styling | Tailwind CSS |
| Charts | SVG Components |
| Authentication | Express Authentication |
| Deployment | Docker, Docker Compose |
| Version Control | Git & GitHub |

---

# ⭐ Core Modules

| Module | Description |
|---------|-------------|
| 🔍 GitHub Analyzer | Analyze repositories, commits and technologies |
| 📄 Resume Builder | Generate ATS-friendly resumes |
| 🌐 Portfolio Builder | Create developer portfolios |
| 📈 Repository Analytics | AI-powered repository insights |
| 🎯 Job Match Engine | Match resume against job descriptions |
| 📊 Dashboard | Developer productivity dashboard |
| 🤖 AI Recommendation Engine | Personalized improvement suggestions |
| 🚀 Deployment Simulator | Simulated deployment logs |

---

# 🎯 Why DevForge AI?

✅ Modern UI

✅ AI Powered

✅ ATS Resume Generator

✅ Portfolio Builder

✅ GitHub Intelligence

✅ Career Analytics

✅ Developer Dashboard

✅ Production Ready Architecture

✅ Docker Support

✅ REST API

✅ Responsive Design

✅ Open Source

---

> **Empowering Developers with Artificial Intelligence 🚀**

---

# 🏗️ System Architecture

> DevForge AI follows a modern client-server architecture with AI-powered services.

```mermaid
flowchart LR

%% Colors
classDef user fill:#ef4444,color:#fff,stroke:#991b1b,stroke-width:3px;
classDef frontend fill:#3b82f6,color:#fff,stroke:#1d4ed8,stroke-width:3px;
classDef backend fill:#10b981,color:#fff,stroke:#047857,stroke-width:3px;
classDef database fill:#f59e0b,color:#fff,stroke:#b45309,stroke-width:3px;
classDef ai fill:#8b5cf6,color:#fff,stroke:#5b21b6,stroke-width:3px;
classDef deploy fill:#06b6d4,color:#fff,stroke:#0e7490,stroke-width:3px;

U((👨‍💻 Developer)):::user

subgraph Frontend
L[Landing Page]
D[Dashboard]
R[Resume Builder]
P[Portfolio Builder]
A[Repository Analytics]
E[Repository Explorer]
end

subgraph Backend
API[Express API]
AUTH[Authentication]
ANA[GitHub Analyzer]
RES[Resume Engine]
PORT[Portfolio Engine]
JOB[Job Match Engine]
end

subgraph AI
GEM[Google Gemini AI]
RULE[Local AI Engine]
end

subgraph Database
DB[(db.json)]
end

subgraph Deployment
DOC[Docker]
COMP[Docker Compose]
NG[Nginx]
end

U --> L
L --> D
D --> API

API --> AUTH
API --> ANA
API --> RES
API --> PORT
API --> JOB

ANA --> GEM
RES --> GEM
PORT --> GEM

GEM --> RULE

AUTH --> DB
ANA --> DB
RES --> DB
PORT --> DB
JOB --> DB

API --> DOC
DOC --> COMP
COMP --> NG

class U user
class L,D,R,P,A,E frontend
class API,AUTH,ANA,RES,PORT,JOB backend
class DB database
class GEM,RULE ai
class DOC,COMP,NG deploy
```

---

# 🌈 Complete Request Flow

```mermaid
sequenceDiagram

actor Developer

participant React Frontend
participant Express API
participant GitHub API
participant Gemini AI
participant Database

Developer->>React Frontend: Enter GitHub Username

React Frontend->>Express API: Analyze Request

Express API->>GitHub API: Fetch Repository Data

GitHub API-->>Express API: Repository Information

Express API->>Gemini AI: AI Analysis

Gemini AI-->>Express API: Resume + Portfolio + Suggestions

Express API->>Database: Save User

Database-->>Express API: Success

Express API-->>React Frontend: Complete Analysis

React Frontend-->>Developer: Dashboard
```

---

# 🚀 User Journey

```mermaid
flowchart TD

%% ===== Node Styles =====
classDef start fill:#FF4D6D,stroke:#C9184A,color:#fff,stroke-width:3px
classDef dashboard fill:#3A86FF,stroke:#1D4ED8,color:#fff,stroke-width:3px
classDef process fill:#06D6A0,stroke:#0F766E,color:#fff,stroke-width:3px
classDef ai fill:#8338EC,stroke:#5A189A,color:#fff,stroke-width:3px
classDef feature fill:#FFBE0B,stroke:#FB5607,color:#000,stroke-width:3px
classDef success fill:#38B000,stroke:#2D6A4F,color:#fff,stroke-width:3px

%% ===== Flow =====

A([👤 User Login])

B[📊 Dashboard]

C[🐙 GitHub Analysis]

D[🤖 AI Processing]

E[📈 Repository Insights]

F[📄 Resume Builder]

G[🌐 Portfolio Builder]

H[🎯 Job Match]

I[🛣️ Career Roadmap]

J[🚀 Portfolio Ready]

K([🎉 Success])

%% ===== Connections =====

A --> B

B --> C

C --> D

D --> E

D --> F

D --> G

D --> H

H --> I

I --> J

J --> K

%% ===== Apply Colors =====

class A start
class B dashboard
class C,D ai
class E,F,G,H feature
class I,J process
class K success
```

---

# 🤖 AI Processing Pipeline

```mermaid
flowchart LR

%% ==========================
%% Color Styles
%% ==========================

classDef github fill:#24292F,stroke:#57606A,color:#ffffff,stroke-width:3px
classDef data fill:#3A86FF,stroke:#1D4ED8,color:#ffffff,stroke-width:3px
classDef ai fill:#8338EC,stroke:#5A189A,color:#ffffff,stroke-width:3px
classDef output fill:#FFBE0B,stroke:#FB5607,color:#000000,stroke-width:3px
classDef dashboard fill:#06D6A0,stroke:#0F766E,color:#ffffff,stroke-width:3px

%% ==========================
%% Nodes
%% ==========================

A([🐙 GitHub Profile])

B[📂 Repository Data]

C[🤖 AI Analysis Engine]

D[📄 ATS Resume]

E[🌐 Portfolio]

F[📊 Repository Analytics]

G[💡 Career Suggestions]

H([📊 Developer Dashboard])

%% ==========================
%% Flow
%% ==========================

A --> B

B --> C

C --> D

C --> E

C --> F

C --> G

D --> H

E --> H

F --> H

G --> H

%% ==========================
%% Apply Styles
%% ==========================

class A github
class B data
class C ai
class D,E,F,G output
class H dashboard
```

---

# ⚙️ Deployment Architecture

```mermaid
flowchart LR

%% =========================
%% Color Styles
%% =========================

classDef developer fill:#FF4D6D,stroke:#C9184A,color:#ffffff,stroke-width:3px
classDef github fill:#24292F,stroke:#57606A,color:#ffffff,stroke-width:3px
classDef docker fill:#2496ED,stroke:#0B63CE,color:#ffffff,stroke-width:3px
classDef compose fill:#0EA5E9,stroke:#0369A1,color:#ffffff,stroke-width:3px
classDef frontend fill:#3B82F6,stroke:#1D4ED8,color:#ffffff,stroke-width:3px
classDef backend fill:#10B981,stroke:#047857,color:#ffffff,stroke-width:3px
classDef database fill:#F59E0B,stroke:#B45309,color:#ffffff,stroke-width:3px
classDef ai fill:#8B5CF6,stroke:#6D28D9,color:#ffffff,stroke-width:3px
classDef browser fill:#22C55E,stroke:#15803D,color:#ffffff,stroke-width:3px

%% =========================
%% Nodes
%% =========================

A([👨‍💻 Developer])

B([🐙 GitHub])

C[🐳 Docker Build]

D[📦 Docker Compose]

E[⚛️ Frontend Container]

F[🚀 Backend Container]

G[(💾 Local Database)]

H[🤖 Gemini AI]

I([🌍 Browser])

%% =========================
%% Connections
%% =========================

A --> B

B --> C

C --> D

D --> E

D --> F

F --> G

F --> H

E --> I

%% =========================
%% Apply Colors
%% =========================

class A developer
class B github
class C docker
class D compose
class E frontend
class F backend
class G database
class H ai
class I browser
```

---

# 📂 Project Structure

```text
DevForge-AI
│
├── 📂 backend
│   │
│   ├── 📂 routes
│   │     ├── auth.js
│   │     ├── analyze.js
│   │     ├── resumes.js
│   │     └── portfolios.js
│   │
│   ├── 📂 data
│   │     └── db.json
│   │
│   ├── db.js
│   ├── server.js
│   ├── package.json
│   └── Dockerfile
│
├── 📂 frontend
│   │
│   ├── 📂 public
│   │     ├── landingpage.png
│   │     ├── developerprofile.png
│   │     ├── developerprofile2.png
│   │     ├── repositoryExplorer.png
│   │     ├── repositoryanalytic.png
│   │     ├── portfolio.png
│   │     ├── airesumerbuilder.png
│   │     └── milestonetimeline.png
│   │
│   ├── 📂 src
│   │     ├── components
│   │     ├── pages
│   │     ├── hooks
│   │     ├── services
│   │     ├── App.tsx
│   │     └── main.tsx
│   │
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml
├── package.json
├── README.md
└── LICENSE
```

---

# 🏛 ASCII Architecture


---

# 📦 Component Interaction

## 🏛 Backend Service Architecture

```mermaid
flowchart LR

%% ==========================
%% Colors
%% ==========================

classDef frontend fill:#3B82F6,stroke:#1D4ED8,color:#ffffff,stroke-width:3px
classDef backend fill:#10B981,stroke:#047857,color:#ffffff,stroke-width:3px
classDef service fill:#F59E0B,stroke:#B45309,color:#000000,stroke-width:3px
classDef external fill:#24292F,stroke:#57606A,color:#ffffff,stroke-width:3px
classDef ai fill:#8B5CF6,stroke:#6D28D9,color:#ffffff,stroke-width:3px
classDef db fill:#EF4444,stroke:#B91C1C,color:#ffffff,stroke-width:3px
classDef dashboard fill:#06B6D4,stroke:#0E7490,color:#ffffff,stroke-width:3px

%% ==========================
%% Nodes
%% ==========================

A[⚛️ React Frontend]

B[🚀 Express Backend]

C[🔐 Authentication]

D[🐙 GitHub Analyzer]

E[📄 Resume Builder]

F[🌐 Portfolio Builder]

G[📊 Analytics Engine]

H[(🐙 GitHub API)]

I[(🤖 Gemini AI)]

J[(💾 db.json)]

K[📈 Developer Dashboard]

%% ==========================
%% Flow
%% ==========================

A --> B

B --> C
B --> D
B --> E
B --> F
B --> G

D --> H

D --> I
E --> I
F --> I

C --> J
D --> J
E --> J
F --> J
G --> J

J --> K
I --> K

K --> A

%% ==========================
%% Apply Styles
%% ==========================

class A frontend
class B backend
class C,D,E,F,G service
class H external
class I ai
class J db
class K dashboard
```
---

# 🔄 Data Flow

## 📊 Developer Workflow

```mermaid
flowchart TD

%% ==========================
%% Styles
%% ==========================

classDef user fill:#FF4D6D,stroke:#C9184A,color:#fff,stroke-width:3px
classDef auth fill:#3B82F6,stroke:#1D4ED8,color:#fff,stroke-width:3px
classDef dashboard fill:#06B6D4,stroke:#0E7490,color:#fff,stroke-width:3px
classDef process fill:#10B981,stroke:#047857,color:#fff,stroke-width:3px
classDef external fill:#24292F,stroke:#57606A,color:#fff,stroke-width:3px
classDef ai fill:#8B5CF6,stroke:#6D28D9,color:#fff,stroke-width:3px
classDef db fill:#F59E0B,stroke:#B45309,color:#000,stroke-width:3px
classDef feature fill:#EC4899,stroke:#BE185D,color:#fff,stroke-width:3px

%% ==========================
%% Nodes
%% ==========================

A([👨‍💻 User])

B[🔐 Login]

C[📊 Dashboard]

D[🔍 Analyze GitHub Profile]

E[(🐙 GitHub API)]

F[🚀 Express Backend]

G[🤖 Gemini AI]

H[(💾 db.json)]

I[📄 AI Resume]

J[🌐 Portfolio]

K[📈 Repository Analytics]

%% ==========================
%% Flow
%% ==========================

A --> B
B --> C
C --> D
D --> E
E --> F
F --> G
G --> H

H --> C

C --> I
C --> J
C --> K

%% ==========================
%% Colors
%% ==========================

class A user
class B auth
class C dashboard
class D,F process
class E external
class G ai
class H db
class I,J,K feature
```
---

## 📌 Architecture Highlights

- ⚡ React + Vite Frontend
- 🚀 Express.js Backend
- 🤖 Google Gemini AI Integration
- 📊 GitHub Repository Intelligence
- 📄 ATS Resume Generator
- 🌐 Portfolio Generator
- 🎯 Job Match Engine
- 💾 Local JSON Database
- 🐳 Dockerized Deployment
- 📈 Production Ready Modular Architecture

---
---

# ⚡ Getting Started

Follow these steps to set up **DevForge AI** on your local machine.

---

# 📋 Prerequisites

Before running the project, ensure the following software is installed:

| Software | Version |
|----------|----------|
| Node.js | >=18.x |
| npm | >=9.x |
| Git | Latest |
| Docker | Latest (Optional) |
| Docker Compose | Latest (Optional) |
| VS Code | Recommended |

---

# 📥 Clone Repository

```bash
git clone https://github.com/Saurav6200907210/DevForge-AI.git

cd DevForge-AI
```

---

# 📦 Install Dependencies

Install root dependencies

```bash
npm install
```

Install frontend

```bash
cd frontend

npm install
```

Install backend

```bash
cd ../backend

npm install
```

Return to root

```bash
cd ..
```

---

# ▶️ Start Development

Run Frontend

```bash
cd frontend

npm run dev
```

Runs on

```
http://localhost:5173
```

---

Run Backend

```bash
cd backend

npm run dev
```

Runs on

```
http://localhost:5000
```

---

# 🚀 Run Everything Together

```bash
npm run dev
```

or

```bash
npm run start-all
```

---

# 🌍 Environment Variables

Create

```
backend/.env
```

Example

```env
PORT=5000

GEMINI_API_KEY=YOUR_GEMINI_API_KEY

JWT_SECRET=your_super_secret_key

DATABASE_PATH=data/db.json

NODE_ENV=development
```

---

# 📂 Folder Structure

```
backend
│
├── data
│     └── db.json
│
├── routes
│
├── server.js
│
├── db.js
│
└── .env
```

---

# 🐳 Docker Setup

Build Docker Images

```bash
docker compose build
```

Run Containers

```bash
docker compose up
```

Detached Mode

```bash
docker compose up -d
```

Stop Containers

```bash
docker compose down
```

Rebuild

```bash
docker compose up --build
```

Check Running Containers

```bash
docker ps
```

View Logs

```bash
docker compose logs
```

---

# 📡 REST API Documentation

## Authentication

### Register/Login

```
POST /api/auth/login
```

Example

```json
{
  "github":"Saurav6200907210"
}
```

---

### Get User

```
GET /api/auth/profile/:github
```

---

# GitHub Analysis

### Analyze Repository

```
POST /api/analyze
```

Body

```json
{
  "github":"Saurav6200907210"
}
```

Returns

- Repository Analysis
- AI Suggestions
- Skills
- Score
- Resume Data
- Portfolio Data

---

# Resume APIs

Get Resume

```
GET /api/resumes/:id
```

Update Resume

```
PUT /api/resumes/:id
```

Improve Resume

```
POST /api/resumes/:id/improve
```

Match Job Description

```
POST /api/resumes/:id/match-job
```

---

# Portfolio APIs

Get Portfolio

```
GET /api/portfolios/:id
```

Update Portfolio

```
PUT /api/portfolios/:id
```

Deploy Portfolio

```
POST /api/portfolios/:id/deploy
```

Push Repository

```
POST /api/portfolios/:id/push-repo
```

---

# 📦 API Response Example

```json
{
  "success": true,
  "score": 91,
  "repositories": 34,
  "skills": [
    "React",
    "Node.js",
    "Docker",
    "TypeScript"
  ],
  "recommendations": [
    "Improve README",
    "Increase Testing",
    "Add CI/CD"
  ]
}
```

---

# 📜 Available Scripts

Root

```bash
npm run dev
```

Starts frontend + backend

---

Frontend

```bash
npm run dev
```

Development Server

```bash
npm run build
```

Production Build

```bash
npm run preview
```

Preview Build

---

Backend

```bash
npm run dev
```

Development Mode

```bash
npm start
```

Production Mode

---

# ⚙️ Configuration

| Variable | Description |
|------------|-----------------------------|
| PORT | Backend Port |
| GEMINI_API_KEY | Google Gemini API |
| JWT_SECRET | Authentication Secret |
| DATABASE_PATH | JSON Database |
| NODE_ENV | Development/Production |

---

# ☁️ Deployment

## Frontend

- Cloudflare Pages
- Vercel
- Netlify

---

## Backend

- Render
- Railway
- Fly.io

---

## Container Deployment

```bash
docker compose up -d
```

---

# 🔐 Authentication Flow

```text
User

↓

Login

↓

GitHub Username

↓

Backend Validation

↓

User Created

↓

Session Started

↓

Dashboard
```

---

# 📊 API Workflow

```text
Frontend

↓

REST API

↓

GitHub API

↓

Gemini AI

↓

Repository Analysis

↓

Resume Generation

↓

Portfolio Generation

↓

Database

↓

Dashboard
```

---

# 💻 Local Development Workflow

```
Git Clone

↓

Install Dependencies

↓

Setup .env

↓

Run Backend

↓

Run Frontend

↓

Open Browser

↓

Analyze GitHub Profile

↓

Generate Resume

↓

Generate Portfolio
```

---

# 🧪 Testing

Run Backend

```bash
npm run dev
```

Test API

```
http://localhost:5000/api/auth/login
```

Open Frontend

```
http://localhost:5173
```

---

# 📈 Performance

✔ Fast React Rendering

✔ TypeScript Safety

✔ Docker Ready

✔ REST APIs

✔ Responsive Design

✔ AI Powered

✔ Modular Codebase

✔ Production Architecture

---
---

# 🌟 Feature Deep Dive

## 🤖 AI GitHub Analyzer

DevForge AI performs an in-depth analysis of public GitHub repositories to generate actionable career insights.

### Features

- Repository Intelligence
- Technology Detection
- Language Statistics
- Repository Health Score
- Commit Activity Analysis
- Open Source Contributions
- Documentation Analysis
- Project Quality Evaluation
- Career Recommendations

---

## 📄 AI Resume Builder

Automatically generates professional ATS-friendly resumes.

### Capabilities

- ATS Optimization
- AI Content Enhancement
- Resume Scoring
- Professional Templates
- PDF Export
- Experience Suggestions
- Skills Optimization
- Achievement Generator

---

## 🌐 Portfolio Builder

Generate beautiful developer portfolios without writing code.

### Includes

- Hero Section
- About
- Skills
- Experience
- Projects
- GitHub Integration
- Contact Section
- Responsive Design

---

## 🎯 Job Match Engine

Compare resumes with job descriptions.

Provides

- ATS Match Score
- Missing Skills
- Keyword Analysis
- Improvement Suggestions
- Learning Roadmap
- Resume Optimization

---

## 📊 Repository Analytics

Displays detailed statistics including

- Stars
- Forks
- Issues
- Pull Requests
- Languages
- Contributors
- Repository Age
- Activity Timeline

---

# 🚀 Project Roadmap

## ✅ Completed

- Authentication
- GitHub Analysis
- Resume Builder
- Portfolio Builder
- Repository Explorer
- Dashboard
- REST APIs
- Docker Support
- Responsive UI

---

## 🚧 In Progress

- AI Chat Assistant
- PDF Resume Templates
- Portfolio Themes
- Better Analytics
- Performance Improvements

---

## 🔮 Future Plans

- PostgreSQL Support
- Redis Cache
- Kubernetes Deployment
- GitHub OAuth
- CI/CD Integration
- AI Interview Simulator
- Cover Letter Generator
- Resume Versioning
- Multi-language Support
- Team Dashboard

---

# 🔒 Security

Current security practices include

- Environment Variables
- JWT Authentication
- Input Validation
- REST API Architecture
- Modular Backend
- Secure Configuration
- Docker Isolation

Future improvements

- OAuth
- Rate Limiting
- HTTPS
- Refresh Tokens
- RBAC
- Secret Manager

---

# 📈 Performance

Current optimizations

- React + Vite
- Lazy Components
- Modular Backend
- Optimized API Calls
- Responsive Layout
- SVG Visualizations
- Fast Local Database

---

# 📊 Technology Overview

| Layer | Technology |
|--------|------------|
| Frontend | React + TypeScript |
| Styling | Tailwind CSS |
| Backend | Express.js |
| Runtime | Node.js |
| AI | Google Gemini |
| Database | JSON Database |
| API | REST |
| Deployment | Docker |
| Version Control | Git |
| IDE | VS Code |

---

# 🤝 Contributing

Contributions are welcome.

## Fork Repository

```bash
git fork
```

Clone

```bash
git clone <repository-url>
```

Create Branch

```bash
git checkout -b feature/new-feature
```

Commit

```bash
git commit -m "Add new feature"
```

Push

```bash
git push origin feature/new-feature
```

Open Pull Request

---

# 📜 Coding Standards

- Clean Code
- Reusable Components
- Responsive Design
- Type Safety
- REST Standards
- Meaningful Commit Messages
- Documentation

---

# 🧪 Development Workflow

```text
Idea

↓

Planning

↓

Design

↓

Development

↓

Testing

↓

Review

↓

Deployment

↓

Maintenance
```

---

# 🐳 Docker Workflow

```text
Developer

↓

Source Code

↓

Docker Build

↓

Docker Image

↓

Docker Compose

↓

Frontend Container

↓

Backend Container

↓

Application Running
```

---

# 🌍 Deployment Options

| Platform | Status |
|-----------|---------|
| Docker | ✅ |
| Render | ✅ |
| Railway | ✅ |
| Vercel | ✅ |
| Netlify | ✅ |
| Cloudflare Pages | ✅ |

---

# 📚 Learning Outcomes

By exploring DevForge AI you can learn

- React
- TypeScript
- Node.js
- Express
- REST APIs
- Docker
- AI Integration
- GitHub APIs
- Authentication
- Dashboard Design
- Modern UI
- Full Stack Development

---

# 💡 Why DevForge AI?

✔ Modern UI

✔ AI Powered

✔ Full Stack Architecture

✔ ATS Resume Builder

✔ Portfolio Generator

✔ GitHub Intelligence

✔ Career Analytics

✔ Docker Ready

✔ Responsive

✔ Production Inspired

✔ Easy to Deploy

✔ Open Source

---

# 📄 License

Distributed under the **MIT License**.

Feel free to use, modify and contribute.

---

# 🙏 Acknowledgements

Special thanks to

- React Team
- Vite Team
- Node.js Community
- Express.js
- Tailwind CSS
- Docker
- Google Gemini AI
- GitHub API
- Open Source Community

---

# ⭐ Support

If you found this project useful

⭐ Star the repository

🍴 Fork the repository

🐛 Report issues

💡 Suggest new features

🤝 Contribute to the project

---

# 📬 Contact

**Developer:** Saurav Kumar

GitHub

```
https://github.com/Saurav6200907210
```

---

# 💖 Built For Developers

<div align="center">

## 🚀 DevForge AI

### Empowering Developers Through Artificial Intelligence

<img src="https://readme-typing-svg.demolab.com?font=Poppins&weight=600&size=26&duration=3500&pause=1000&center=true&vCenter=true&width=700&lines=AI+Powered+Developer+Platform;GitHub+Career+Intelligence;ATS+Resume+Generator;Portfolio+Builder;Repository+Analytics;Built+with+React+%2B+Node.js+%2B+AI"/>

### ⭐ If you like this project, don't forget to Star the repository!

