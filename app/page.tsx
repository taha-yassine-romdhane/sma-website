import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutSummary from "./components/AboutSummary";
import Services from "./components/Services";
import PortfolioSummary from "./components/PortfolioSummary";
import Partners from "./components/Partners";
import ContactSummary from "./components/ContactSummary";
import Footer from "./components/Footer";
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

export default async function Home() {
  const heroSlides = await getHeroSlides();
  const partners = await getPartners();

  return (
    <div>
      <Navbar />
      <Hero slides={heroSlides} />
      <AboutSummary />
      <Services />
      <PortfolioSummary />
      <Partners partners={partners} />
      <ContactSummary />
      <Footer />
    </div>
  );
}
