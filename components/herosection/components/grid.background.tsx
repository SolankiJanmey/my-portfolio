import { cn } from "@/lib/utils";
import React, { useEffect } from "react";

export function GridBackground({ content }: { content: any }) {
  useEffect(() => {
    // Create animated blur orbs
    const createOrbs = () => {
      const orbs = document.querySelectorAll(".blur-orb");
      orbs.forEach((orb) => orb.remove());

      const container = document.getElementById("gradient-container");
      if (!container) return;

      // Create multiple orbs with different colors and positions
      const orbColors = [
        "rgba(100, 210, 255, 0.5)", // Light blue
        "rgba(0, 150, 199, 0.4)", // Sea blue
        "rgba(72, 176, 208, 0.5)", // Medium blue
        "rgba(0, 180, 216, 0.4)", // Lagoon blue
      ];

      const createOrb = (color: any, size: any, delay: any) => {
        const orb = document.createElement("div");
        orb.className =
          "blur-orb absolute rounded-full filter blur-3xl opacity-70";
        orb.style.backgroundColor = color;
        orb.style.width = `${size}px`;
        orb.style.height = `${size}px`;

        // Random starting position within container
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;

        orb.style.left = `${startX}%`;
        orb.style.top = `${startY}%`;
        orb.style.transform = "translate(-50%, -50%)";

        // Add animation with random delay and faster duration (8s instead of 20s)
        orb.style.animation = `float-orb 6s ease-in-out ${delay}s infinite alternate`;

        container.appendChild(orb);
      };

      // Create multiple orbs with varied speeds
      createOrb(orbColors[0], 500, 0);
      createOrb(orbColors[1], 400, 1);
      createOrb(orbColors[2], 600, 0.5);
      createOrb(orbColors[3], 350, 1.5);
      createOrb(orbColors[0], 450, 0.2);
      createOrb(orbColors[2], 300, 0.8);
    };

    // Add animation styles
    const addAnimationStyles = () => {
      if (!document.getElementById("blur-gradient-styles")) {
        const style = document.createElement("style");
        style.id = "blur-gradient-styles";
        style.innerHTML = `
          @keyframes float-orb {
            0% { transform: translate(-50%, -50%) translate(0, 0); }
            20% { transform: translate(-50%, -50%) translate(150px, -70px); }
            40% { transform: translate(-50%, -50%) translate(70px, 150px); }
            60% { transform: translate(-50%, -50%) translate(-150px, 70px); }
            80% { transform: translate(-50%, -50%) translate(-70px, -150px); }
            100% { transform: translate(-50%, -50%) translate(0, 0); }
          }
        `;
        document.head.appendChild(style);
      }
    };

    addAnimationStyles();
    createOrbs();

    // Update on resize
    window.addEventListener("resize", createOrbs);

    return () => {
      window.removeEventListener("resize", createOrbs);
    };
  }, []);

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-sky-100 to-blue-100">
      {/* Gradient blur container */}
      <div
        id="gradient-container"
        className="absolute inset-0 overflow-hidden"
      ></div>

      {/* Grid pattern */}
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,rgba(255,255,255,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.3)_1px,transparent_1px)]",
          "z-10"
        )}
      />

      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white/30 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] z-20"></div>

      {/* Content container */}
      <div className="relative z-30">{content}</div>
    </div>
  );
}
