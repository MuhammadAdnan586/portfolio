import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { About } from '@/components/about';
import { Skills } from '@/components/skills';
import { Projects } from '@/components/projects';
import { Experience } from '@/components/experience';
import { Certifications } from '@/components/certifications';
import { GitHubStats } from '@/components/github-stats';
import { Contact } from '@/components/contact';
import { Footer } from '@/components/footer';
import { ScrollProgress } from '@/components/scroll-progress';

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Certifications />
      <GitHubStats />
      <Contact />
      <Footer />
    </>
  );
}
