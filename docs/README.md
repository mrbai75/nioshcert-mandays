# NIOSHCert Mandays Calculation System

Sistem pengiraan mandays untuk NIOSHCert — 5 standard ISO.

## Standards Supported

- OSHMS (ISO 45001)
- QMS (ISO 9001)
- EMS (ISO 14001)
- ABMS (ISO 37001)
- ISMS (ISO 27001)

## Tech Stack

- **Backend:** Node.js + NestJS + TypeScript
- **Frontend:** React + Vite + TypeScript
- **Database:** PostgreSQL (via Docker)
- **ORM:** Prisma
- **PDF:** Puppeteer

## Prerequisites

- Node.js 20+
- pnpm 9+
- Docker Desktop
- Git

## Setup

```bash
# Install dependencies
pnpm install

# Start database
docker compose up -d

# Run backend
pnpm --filter backend dev

# Run frontend
pnpm --filter frontend dev