import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@sma-aluminium.com' },
    update: {},
    create: {
      email: 'admin@sma-aluminium.com',
      password: hashedPassword,
      name: 'Admin SMA',
    },
  });

  console.log('✅ Admin user created:', admin.email);

  // Seed portfolio items
  const portfolioItems = [
    {
      title: 'Fenêtres Modernes pour Villa',
      category: 'Fenêtres',
      description: 'Installation de fenêtres en aluminium à double vitrage pour une isolation thermique et acoustique optimale.',
      imageUrl: 'https://via.placeholder.com/600x400?text=Fenêtres',
      order: 1,
    },
    {
      title: 'Porte d\'Entrée Sécurisée',
      category: 'Portes',
      description: 'Création d\'une porte d\'entrée robuste et élégante avec des finitions personnalisées.',
      imageUrl: 'https://via.placeholder.com/600x400?text=Porte',
      order: 2,
    },
    {
      title: 'Véranda Lumineuse',
      category: 'Vérandas',
      description: 'Conception et montage d\'une véranda sur mesure pour agrandir l\'espace de vie.',
      imageUrl: 'https://via.placeholder.com/600x400?text=Véranda',
      order: 3,
    },
    {
      title: 'Baie Vitrée Panoramique',
      category: 'Fenêtres',
      description: 'Pose d\'une grande baie vitrée coulissante pour une vue imprenable et un maximum de lumière.',
      imageUrl: 'https://via.placeholder.com/600x400?text=Baie+Vitrée',
      order: 4,
    },
    {
      title: 'Portail Automatique Design',
      category: 'Portes',
      description: 'Fabrication d\'un portail en aluminium motorisé avec un design contemporain.',
      imageUrl: 'https://via.placeholder.com/600x400?text=Portail',
      order: 5,
    },
    {
      title: 'Garde-corps pour Terrasse',
      category: 'Autres',
      description: 'Installation de garde-corps en aluminium pour sécuriser une terrasse avec style.',
      imageUrl: 'https://via.placeholder.com/600x400?text=Garde-corps',
      order: 6,
    },
  ];

  for (const item of portfolioItems) {
    await prisma.portfolio.upsert({
      where: { id: item.title }, // Using title as unique identifier for upsert
      update: {},
      create: item,
    });
  }

  console.log('✅ Portfolio items seeded');

  // Seed hero slider
  const heroSlides = [
    {
      title: 'SMA - Société M\'saken Aluminium',
      subtitle: 'Votre partenaire de confiance pour des solutions d\'aluminium haut de gamme.',
      imageUrl: 'https://via.placeholder.com/1920x1080?text=Hero+1',
      order: 1,
      active: true,
    },
    {
      title: 'Qualité et Excellence',
      subtitle: 'Des produits en aluminium certifiés pour votre confort et sécurité.',
      imageUrl: 'https://via.placeholder.com/1920x1080?text=Hero+2',
      order: 2,
      active: true,
    },
    {
      title: 'Sur Mesure et Personnalisé',
      subtitle: 'Chaque projet est unique. Nous créons des solutions adaptées à vos besoins.',
      imageUrl: 'https://via.placeholder.com/1920x1080?text=Hero+3',
      order: 3,
      active: true,
    },
  ];

  for (const slide of heroSlides) {
    await prisma.heroSlider.upsert({
      where: { id: slide.title }, // Using title as unique identifier
      update: {},
      create: slide,
    });
  }

  console.log('✅ Hero sliders seeded');
  console.log('✨ Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
