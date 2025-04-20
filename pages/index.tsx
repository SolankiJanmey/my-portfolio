import { Sacramento, Alice } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, useScroll } from "framer-motion";
import Lenis from "lenis";
import Preloader from "@/components/preloader";
import Header from "@/components/header";
import GridHeroSection from "@/components/herosection";
import About from "@/components/about";
import Contact from "@/components/contact";
import Footer from "@/components/footer/Footer";
import BlogsPage from "@/components/blog";

export const sacramento = Sacramento({
  variable: "--font-sacramento",
  subsets: ["latin"],
  weight: "400",
});

export const alice = Alice({
  variable: "--font-alice",
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: any) {
      lenis.raf(time);

      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 8000);
    loadingTimeout;

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

  return (
    <main
      className={`${sacramento.className} max-w-[1920px] mx-auto`}
      ref={container}
    >
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      <Header />
      {!isLoading && (
        <div>
          <GridHeroSection scrollYProgress={scrollYProgress} />
          <About />
          <BlogsPage />
          <Contact />
          <Footer />
          {/* <Skills />
          <Career />
          <Portfolio />
          <Contact /> */}
          {/* <Contact /> */}
        </div>
      )}
    </main>
  );
}
