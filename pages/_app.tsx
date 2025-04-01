import { CustomCursor } from "@/components/cursor.component";
import PixelTransition from "@/components/pixeltransition";
import "@/styles/globals.css";
import { motion, AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null; // Prevent hydration mismatch by skipping SSR
  return (
    <>
      <Head>
        <title>Janmey Solanki</title>
      </Head>
      <div className="hidden lg:block">
        <CustomCursor />
      </div>
      <AnimatePresence mode="wait">
        {router.pathname !== "/" && (
          <motion.div key={router.pathname + "-transition"}>
            <PixelTransition />
          </motion.div>
        )}

        <motion.div
          key={router.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </>
  );
}
