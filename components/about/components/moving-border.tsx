import React from "react";
import { motion } from "framer-motion";

const ProfessionalAnimatedButton = ({
  onClick,
  text,
}: {
  onClick?: Function;
  text: string;
}) => {
  // Professional color palette
  const colors = {
    primary: "#F2FAF8", // Sky blue
    primaryDark: "#001A10", // Darker blue
    white: "#ffffff",
    shadow: "rgba(0, 26, 16, 0.3)",
    accent: "#e0f2fe", // Very light blue
  };

  // Button animations (subtle and professional)
  const buttonVariants = {
    initial: {
      backgroundColor: colors.primary,
      boxShadow: `0 1px 1px ${colors.shadow}`,
      y: 0,
    },
    hover: {
      backgroundColor: colors.primaryDark,
      boxShadow: `0 6px 10px ${colors.shadow}`,
      y: -2,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      y: 0,
      boxShadow: `0 3px 5px ${colors.shadow}`,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
      },
    },
  };

  // Text animations
  const textVariants = {
    initial: {
      y: 0,
    },
    hover: {
      y: 0,
    },
    tap: {
      y: 1,
    },
  };

  // Arrow animations
  const arrowVariants = {
    initial: {
      x: 0,
      opacity: 1,
    },
    hover: {
      x: 3,
      opacity: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    tap: {
      x: 0,
    },
  };

  // Progress bar animation (for after click)
  const progressVariants = {
    initial: {
      width: 0,
      opacity: 0,
    },
    loading: {
      width: "100%",
      opacity: 1,
      transition: {
        duration: 1.5,
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white">
      <motion.button
        className="relative flex items-center justify-center px-6 py-3 rounded-lg text-black font-medium overflow-hidden min-w-40"
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
      >
        {/* Main content */}
        <div className="flex items-center gap-2 z-10">
          <motion.span variants={textVariants}>{text}</motion.span>
          <motion.div variants={arrowVariants}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </motion.div>
        </div>

        {/* Background effect */}
        <motion.div
          className="absolute inset-0 bg-white opacity-0"
          animate={{ opacity: [0, 0.1, 0] }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 2,
          }}
        />

        {/* Progress bar (bottom of button) */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-white"
          variants={progressVariants}
          initial="initial"
          whileTap="loading"
        />

        {/* Subtle ripple effect on click */}
        <motion.div
          className="absolute w-full h-full top-0 left-0 pointer-events-none"
          whileTap={{
            scale: [0, 1.5],
            opacity: [0.5, 0],
            borderRadius: ["100%", "100%"],
          }}
          transition={{ duration: 0.5 }}
          style={{
            backgroundColor: colors.white,
          }}
        />
      </motion.button>
    </div>
  );
};

export default ProfessionalAnimatedButton;
