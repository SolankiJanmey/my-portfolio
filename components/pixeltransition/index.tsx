import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { links } from "../header/Nav/data";
import { alice } from "@/pages";

const anim = {
  initial: {
    opacity: 0,
  },
  open: (i: any) => ({
    opacity: 1,
    transition: { duration: 0, delay: 0.03 * i },
  }),
  closed: (i: any) => ({
    opacity: 0,
    transition: { duration: 0, delay: 0.03 * i },
  }),
};

export default function PixelTransition() {
  const [isNavigating, setIsNavigating] = useState(true);
  const [hasCompletedTransition, setHasCompletedTransition] = useState(false);
  const router = useRouter();

  // Get the current route
  const currentRoute = router.pathname;

  // Find the matching title based on the current route
  const matchingLink = links.find((link) => link.href === currentRoute);
  const pageTitle = matchingLink ? matchingLink.title : "";

  console.log("pi", pageTitle, currentRoute, router.pathname);

  useEffect(() => {
    // First timeout to finish navigating after 3 seconds
    const navigatingTimeout = setTimeout(() => {
      setIsNavigating(false);
    }, 2000);

    // Second timeout to hide the PixelTransition 1 second after navigating is complete
    const transitionTimeout = setTimeout(() => {
      setHasCompletedTransition(true);
    }, 2500); // 3 seconds for navigation + 1 second buffer

    // Cleanup
    return () => {
      clearTimeout(navigatingTimeout);
      clearTimeout(transitionTimeout);
    };
  }, []);

  /**
   * Shuffles array in place (Fisher–Yates shuffle).
   * @param {Array} a items An array containing the items.
   */
  const shuffle = (a: any) => {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  };

  const getBlocks = () => {
    const { innerWidth, innerHeight } = window;
    const blockSize = innerWidth * 0.05;
    const nbOfBlocks = Math.ceil(innerHeight / blockSize);
    const shuffledIndexes = shuffle([...Array(nbOfBlocks)].map((_, i) => i));
    return shuffledIndexes.map((randomIndex: any, index: any) => {
      return (
        <motion.div
          key={index}
          className={styles.block}
          variants={anim}
          initial="initial"
          animate={isNavigating ? "open" : "closed"}
          custom={randomIndex}
        />
      );
    });
  };

  return (
    <div
      style={{
        display: hasCompletedTransition ? "none" : "block", // Hide after animation completes
      }}
    >
      {/* Show the page title in the center */}
      {pageTitle && (
        <motion.div
          className={`text-white ${alice.className}`}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "8rem",
            fontWeight: "bold",
            textAlign: "center",
            zIndex: 10,
            textTransform: "uppercase",
          }}
        >
          {pageTitle}
        </motion.div>
      )}
      <div className={styles.pixelBackground}>
        {[...Array(20)].map((_, index) => {
          return (
            <div key={index} className={styles.column}>
              {getBlocks()}
            </div>
          );
        })}
      </div>
    </div>
  );
}
