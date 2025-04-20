import { CustomCursor } from "@/components/cursor.component";
import RouterAnimation from "@/components/pixeltransition";
import "@/styles/globals.css";
import { motion, AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);
  const [isComplete, setIsComplete] = useState(true);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsComplete(false);
    }, 2000);
    loadingTimeout;

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, [router.pathname]);

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
            {isComplete && <RouterAnimation isComplete={isComplete} />}
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
