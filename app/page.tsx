"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import Navbar from "@/components/Navbar";
import ZondaScrollCanvas from "@/components/ZondaScrollCanvas";
import ZondaExperience from "@/components/ZondaExperience";
import { SpecsGrid, Features, Footer } from "@/components/SupportingSections";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <main className="bg-pagani-black min-h-screen text-white">
      <Navbar />

      {/* SCROLL SEQUENCE SECTION */}
      <section ref={containerRef} className="h-[500vh] relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-pagani-black">
          {/* Background Canvas */}
          <ZondaScrollCanvas
            scrollYProgress={scrollYProgress}
            totalFrames={240}
            imageFolderPath="/images/ezgif-1e14c9bc83d76c21-jpg"
          />

          {/* HUD Experience Overlay */}
          <ZondaExperience scrollYProgress={scrollYProgress} />
        </div>
      </section>

      {/* ADDITIONAL CONTENT */}
      <div className="relative z-20 bg-pagani-black">
        <SpecsGrid />
        <Features />
        <Footer />
      </div>

      {/* Grainy Texture Overlay for Premium Feel */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </main>
  );
}
