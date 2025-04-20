import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./style.module.scss";
import { slideUp } from "./anim";
import { sacramento } from "@/pages";

export const links = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About Me",
    href: "/about",
  },
  {
    title: "Projects",
    href: "/projects",
  },
  {
    title: "Blogs",
    href: "/blogs",
  },
  {
    title: "Contact Me",
    href: "/contact",
  },
];

const RippleEffect = () => (
  <motion.div
    className="absolute inset-0 flex items-center justify-center"
    initial={{ opacity: 1 }}
    animate={{ opacity: 0 }}
    transition={{ duration: 1, delay: 0.2 }}
  >
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full border border-black/5"
        initial={{ width: "100px", height: "100px", opacity: 0.5 }}
        animate={{
          width: "300vw",
          height: "300vw",
          opacity: 0,
        }}
        transition={{
          duration: 1.5,
          delay: i * 0.2,
          ease: "easeOut",
        }}
      />
    ))}
  </motion.div>
);

const WaveForm = ({
  currentMessage,
  isComplete,
}: {
  currentMessage: string;
  isComplete: boolean;
}) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        className="absolute w-full h-full flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {[...Array(3)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-96 h-96 border border-black/5"
            style={{
              rotate: index * 60,
            }}
            animate={{
              scale: isComplete ? [1, 1.5, 2] : [1, 1.2, 1],
              rotate: [index * 60, index * 60 + 360],
              opacity: isComplete ? 0 : 1,
              borderRadius: [
                "30% 70% 70% 30% / 30% 30% 70% 70%",
                "50% 50% 50% 50%",
              ],
            }}
            transition={{
              duration: isComplete ? 1 : 8,
              repeat: isComplete ? 0 : Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: index * 0.4,
            }}
          />
        ))}

        <motion.div
          className="absolute w-64 h-64 bg-gradient-to-br from-black/5 to-transparent"
          animate={{
            rotate: [0, 360],
            scale: isComplete ? [0.8, 1.5, 2] : [0.8, 1, 0.8],
            opacity: isComplete ? 0 : 1,
            borderRadius: [
              "30% 70% 70% 30% / 30% 30% 70% 70%",
              "50% 50% 50% 50%",
            ],
          }}
          transition={{
            duration: isComplete ? 1 : 10,
            repeat: isComplete ? 0 : Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentMessage}
            className="absolute text-5xl font-light text-black/30 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {currentMessage}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default function RouterAnimation({
  isComplete,
}: {
  isComplete: boolean;
}) {
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const router = useRouter();

  // Get the current route
  const currentRoute = router.pathname;

  // Find the matching title based on the current route
  const matchingLink = links.find((link) => link.href === currentRoute);
  const pageTitle = matchingLink ? matchingLink.title : "";

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  return (
    <motion.div
      variants={slideUp}
      initial={{
        borderRadius: "0",
        boxShadow: "0px",
      }}
      animate={{
        borderRadius: "0 0 60px 60px",
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
      }}
      exit="exit"
      transition={{
        duration: 1, // Adjust for smoothness
        ease: "easeInOut",
        delay: 2,
      }}
      className={`h-screen w-screen flex items-center justify-center fixed z-[10000000000000000] overflow-hidden bg-white ${sacramento.className}`}
    >
      <WaveForm currentMessage={pageTitle} isComplete={isComplete} />
      {isComplete && <RippleEffect />}

      <motion.div
        className={styles.preloader}
        initial={{ opacity: 1 }}
        animate={{ opacity: isComplete ? 0 : 1 }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
      >
        {dimension.width > 0 && (
          <div className={styles.loader}>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className={styles.bar}
                style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
                animate={{
                  scaleY: [1, 2, 1],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: i * 0.15,
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
