import Hero from "@/components/sections/Hero";
import Welcome from "@/components/sections/Welcome";
import SchoolsGrid from "@/components/sections/SchoolsGrid";
import WhyUEC from "@/components/sections/WhyUEC";
import NewsGrid from "@/components/sections/NewsGrid";
import ApplyBand from "@/components/sections/ApplyBand";
import RevealScript from "@/components/layout/RevealScript";

export default function Home() {
  return (
    <main>
      <RevealScript />
      <Hero />
      <Welcome />
      <SchoolsGrid />
      <WhyUEC />
      <NewsGrid />
      <ApplyBand />
    </main>
  );
}
