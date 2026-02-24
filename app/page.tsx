import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Gallery from '@/components/Gallery';
import Skills from '@/components/Skills';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import Booking from '@/components/Booking';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { getPortfolioItems } from '@/lib/db/portfolio';
import { getPricingPackages } from '@/lib/db/pricing';
import { getTestimonials } from '@/lib/db/testimonials';
import { getSkills, getEquipment, getAwards } from '@/lib/db/skills';
import { getSiteSettings } from '@/lib/db/settings';

export default async function Home() {
  const [
    portfolioItems,
    packages,
    testimonials,
    skills,
    equipment,
    awards,
    settings,
  ] = await Promise.all([
    getPortfolioItems(),
    getPricingPackages(),
    getTestimonials(),
    getSkills(),
    getEquipment(),
    getAwards(),
    getSiteSettings(),
  ]);

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero hero={settings.hero} />
      <About about={settings.about} />
      <Gallery items={portfolioItems} />
      <Skills skills={skills} equipment={equipment} awards={awards} />
      <Testimonials testimonials={testimonials} />
      <Pricing packages={packages} />
      <Booking />
      <Contact />
      <Footer footer={settings.footer} />
    </main>
  );
}
