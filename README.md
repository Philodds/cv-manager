# CV Manager — Gestionnaire Intelligent de CV avec IA

Application web de gestion de CV et lettres de motivation avec génération automatique par IA.

## Technologies
- **Frontend**: React, Vite, Tailwind CSS, Axios
- **Backend**: Node.js, Express.js, Mongoose
- **Base de données**: MongoDB
- **IA**: Claude API (Anthropic)
- **DevOps**: Docker, Docker Compose, GitHub Actions

## Installation locale

### Prérequis
- Node.js v18+
- MongoDB (ou Docker)

### Backend
\`\`\`bash
cd backend
npm install
cp .env.example .env
# Remplir les variables dans .env
npm run dev
\`\`\`

### Frontend
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

## Installation avec Docker
\`\`\`bash
docker-compose up --build
\`\`\`

## Variables d'environnement
Voir `.env.example` dans le dossier backend.