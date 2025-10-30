import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutSummary from "./components/AboutSummary";
import Services from "./components/Services";
import PortfolioSummary from "./components/PortfolioSummary";
import ProductsSummary from "./components/ProductsSummary";
import Partners from "./components/Partners";
import ContactSummary from "./components/ContactSummary";
import Footer from "./components/Footer";
import SocialMediaFloat from "./components/SocialMediaFloat";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

async function getHeroSlides() {
  return await prisma.heroSlider.findMany({
    where: { active: true },
    orderBy: { order: 'asc' },
  });
}

async function getPartners() {
  return await prisma.partner.findMany({
    where: { active: true },
    orderBy: { order: 'asc' },
  });
}

async function getPortfolioItems() {
  return await prisma.portfolio.findMany({
    where: { published: true },
    orderBy: { order: 'asc' },
    take: 6, // Only get the first 6 items
    include: {
      categories: true,
    },
  });
}

async function getProducts() {
  return await prisma.product.findMany({
    where: { published: true },
    orderBy: { order: 'asc' },
    take: 3, // Only get the first 3 products
    include: {
      categories: true,
    },
  });
}

export default async function Home() {
  const heroSlides = await getHeroSlides();
  const partners = await getPartners();
  const portfolioItems = await getPortfolioItems();
  const products = await getProducts();

  return (
    <div>
      <Navbar />
      <SocialMediaFloat />
      <Hero slides={heroSlides} />
      <AboutSummary />
      <Services />
      <PortfolioSummary portfolioItems={portfolioItems} />
      <ProductsSummary products={products} />
      <Partners partners={partners} />
      <ContactSummary />
      <Footer />
    </div>
  );
}
