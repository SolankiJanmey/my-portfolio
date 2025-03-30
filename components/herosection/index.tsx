import { GridBackground } from "./components/grid.background";
import { motion, MotionValue, useTransform } from "framer-motion";
export default function GridHeroSection({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 1, ease: "easeInOut" },
    }),
  };
  return (
    <motion.div
      style={{ scale, rotate }}
      className="sticky top-0 h-screen text-[3.5vw] flex flex-col items-center justify-center text-white z-[-1]"
    >
      <GridBackground
        content={
          <div className="relative z-10 text-center gap-2 flex flex-col">
            <motion.h1
              className="text-8xl font-semibold text-neutral-800"
              initial="hidden"
              animate="visible"
            >
              {"Janmey Solanki".split("").map((char, i) => (
                <motion.span key={i} custom={i} variants={textVariants}>
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h1>
            <motion.h2
              className="text-4xl mt-4 font-light text-neutral-600"
              initial="hidden"
              animate="visible"
            >
              {"Senior Software Engineer".split("").map((char, i) => (
                <motion.span key={i} custom={i} variants={textVariants}>
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h2>
          </div>
        }
      />
    </motion.div>
  );
}
