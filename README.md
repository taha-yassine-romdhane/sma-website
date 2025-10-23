# 🏗️ SMA - Société M'saken Aluminium

A modern, full-featured showcase website for an aluminum carpentry business built with Next.js 15, TypeScript, Prisma, and PostgreSQL.

## ✨ Features

### Public Website
- 🎨 Modern, responsive design with Tailwind CSS
- 🖼️ Dynamic hero slider
- 📦 Product catalog with categories and filtering
- 🖼️ Portfolio showcase with image galleries
- 📧 Contact form with database storage
- 🤝 Partners section
- 📱 Fully responsive (mobile, tablet, desktop)

### Admin Panel
- 🔐 Secure authentication with NextAuth.js
- 📊 Dashboard with statistics
- 🎯 Manage hero slider images
- 📦 Full CRUD for products (with image galleries)
- 🖼️ Portfolio management
- 🤝 Partners management
- 📧 Contact messages inbox
- ⚙️ Settings and password change

### Product Management
- Multiple image galleries per product
- Dynamic features list
- Technical specifications
- Category filtering
- SEO-friendly slugs
- Publish/unpublish functionality
- Order management

## 🚀 Quick Start with Docker

### Prerequisites
- Docker
- Docker Compose

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd sma-aliminuim
```

2. **Create environment file**
```bash
cp .env.example .env
```

3. **Edit .env file** with your configuration:
```env
POSTGRES_PASSWORD=your_secure_password
AUTH_SECRET=your_generated_secret_key
NEXTAUTH_URL=http://localhost:3000
```

4. **Start with one command** (Linux/Mac)
```bash
./docker-start.sh
```

Or manually:
```bash
docker-compose up -d --build
docker-compose exec web npx prisma migrate deploy
docker-compose exec web npm run seed
```

5. **Access the application**
- Website: http://localhost:3000
- Admin: http://localhost:3000/admin/login

### Default Credentials
See `CREDENTIALS.md` file (not committed to git)

## 🛠️ Development Setup

### Prerequisites
- Node.js 20+
- PostgreSQL 16+
- npm or yarn

### Local Development

1. **Install dependencies**
```bash
npm install
```

2. **Setup environment**
```bash
cp .env.example .env.local
# Edit .env.local with your local database credentials
```

3. **Run database migrations**
```bash
npx prisma migrate dev
```

4. **Seed database**
```bash
npm run seed
```

5. **Start development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
sma-aliminuim/
├── app/                          # Next.js App Router
│   ├── admin/                    # Admin panel
│   │   ├── dashboard/            # Dashboard pages
│   │   │   ├── products/         # Products management
│   │   │   ├── portfolio/        # Portfolio management
│   │   │   ├── hero/             # Hero slider management
│   │   │   ├── partners/         # Partners management
│   │   │   ├── contacts/         # Contact messages
│   │   │   └── settings/         # Settings
│   │   └── login/                # Admin login
│   ├── products/                 # Public products pages
│   │   └── [slug]/               # Product detail page
│   ├── portfolio/                # Portfolio page
│   ├── about/                    # About page
│   ├── contact/                  # Contact page
│   ├── components/               # Reusable components
│   └── api/                      # API routes
├── prisma/                       # Database schema & migrations
│   ├── schema.prisma             # Database schema
│   ├── migrations/               # Migration history
│   └── seed.ts                   # Database seeding
├── public/                       # Static files
│   └── uploads/                  # Uploaded images
├── Dockerfile                    # Docker configuration
├── docker-compose.yml            # Docker Compose setup
├── DEPLOYMENT.md                 # Deployment guide
└── CREDENTIALS.md                # Admin credentials (gitignored)
```

## 🐳 Docker Commands

```bash
# Start containers
docker-compose up -d

# View logs
docker-compose logs -f web

# Stop containers
docker-compose down

# Rebuild
docker-compose up -d --build

# Run migrations
docker-compose exec web npx prisma migrate deploy

# Access database
docker-compose exec postgres psql -U postgres -d sma-db
```

## 📦 Database

### Models
- **User** - Admin users
- **Product** - Product catalog
- **ProductImage** - Product gallery images
- **Portfolio** - Portfolio items
- **HeroSlider** - Hero slider images
- **Partner** - Partner logos
- **Contact** - Contact form submissions

### Migrations
```bash
# Create new migration
npx prisma migrate dev --name migration_name

# Apply migrations
npx prisma migrate deploy

# Reset database (caution: deletes all data)
npx prisma migrate reset
```

## 🔐 Security

- ✅ Environment variables for sensitive data
- ✅ bcrypt password hashing
- ✅ NextAuth.js authentication
- ✅ CSRF protection
- ✅ Credentials not exposed in code
- ✅ Docker security best practices

**Important:**
- Change default admin password after first login
- Use strong `AUTH_SECRET` in production
- Enable HTTPS in production
- Regular database backups

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions including:
- VPS deployment
- Docker deployment
- Nginx configuration
- SSL/HTTPS setup
- Domain configuration

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL 16
- **ORM:** Prisma
- **Authentication:** NextAuth.js v5
- **Styling:** Tailwind CSS 4
- **UI Icons:** Lucide React
- **Containerization:** Docker & Docker Compose

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run seed         # Seed database
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 📞 Support

For support or questions:
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment issues
- Check [CREDENTIALS.md](./CREDENTIALS.md) for admin access

---

**Built with ❤️ for SMA - Société M'saken Aluminium**
