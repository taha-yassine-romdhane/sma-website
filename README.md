# SMA - Société M'saken Aluminium

A modern showcase website for an aluminum carpentry business built with Next.js 15, TypeScript, Prisma, and PostgreSQL.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL 16
- **ORM:** Prisma
- **Authentication:** NextAuth.js v5
- **Styling:** Tailwind CSS 4
- **Containerization:** Docker & Docker Compose

## Features

- Modern, responsive design
- Product catalog with image galleries
- Portfolio showcase
- Contact form
- Admin panel for content management
- Docker support for easy deployment

## Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL 16+
- Docker (optional)

### Installation

1. Clone the repository
```bash
git clone <repo-url>
cd sma-aliminuim
```

2. Install dependencies
```bash
npm install
```

3. Setup environment
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. Run migrations
```bash
npx prisma migrate dev
```

5. Seed database
```bash
npm run seed
```

6. Start development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Docker Deployment

```bash
# Start with Docker Compose
docker-compose up -d --build

# Run migrations
docker-compose exec web npx prisma migrate deploy

# Seed database
docker-compose exec web npm run seed
```

## License

This project is private and proprietary.

---

Built with ❤️ for SMA - Société M'saken Aluminium
