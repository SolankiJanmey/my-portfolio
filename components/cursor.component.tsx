import { useEffect, useState } from "react";

export function CustomCursor() {
  // State to track if cursor is hovering an interactive element
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const circleElement: any = document.querySelector(".circle");
    if (!circleElement) return;

    // Create objects to track mouse position and custom cursor position
    const mouse = { x: 0, y: 0 }; // Track current mouse position
    const previousMouse = { x: 0, y: 0 }; // Store the previous mouse position
    const circle = { x: 0, y: 0 }; // Track the circle position

    // Initialize variables to track scaling and rotation
    let currentScale = 0; // Track current scale value
    let currentAngle = 0; // Track current angle value
    let targetHoverScale = 0; // Target hover scale
    let currentHoverScale = 0; // Current interpolated hover scale

    // Mousemove handler function
    const handleMouseMove = (e: any) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Check if mouse is over an interactive element
      const elementUnderCursor = document.elementFromPoint(
        e.clientX,
        e.clientY
      );
      if (elementUnderCursor) {
        const isInteractive =
          elementUnderCursor.tagName === "A" ||
          elementUnderCursor.tagName === "BUTTON" ||
          elementUnderCursor.tagName === "INPUT" ||
          elementUnderCursor.tagName === "TEXTAREA" ||
          elementUnderCursor.tagName === "SELECT" ||
          elementUnderCursor.getAttribute("role") === "button" ||
          elementUnderCursor.classList.contains("interactive");

        targetHoverScale = isInteractive ? 0.5 : 0; // Set target scale
      } else {
        targetHoverScale = 0;
      }
    };

    // Add event listener for mouse movement
    window.addEventListener("mousemove", handleMouseMove);

    // Smoothing factor for cursor movement speed (0 = smoother, 1 = instant)
    const speed = 0.17;
    const hoverSpeed = 0.1; // Slower interpolation for hover effect

    // Start animation
    const tick = () => {
      // MOVE
      // Calculate circle movement based on mouse position and smoothing
      circle.x += (mouse.x - circle.x) * speed;
      circle.y += (mouse.y - circle.y) * speed;

      // Smoothly interpolate hover scale
      currentHoverScale += (targetHoverScale - currentHoverScale) * hoverSpeed;

      // SQUEEZE
      // 1. Calculate the change in mouse position (deltaMouse)
      const deltaMouseX = mouse.x - previousMouse.x;
      const deltaMouseY = mouse.y - previousMouse.y;

      // Update previous mouse position for the next frame
      previousMouse.x = mouse.x;
      previousMouse.y = mouse.y;

      // 2. Calculate mouse velocity using Pythagorean theorem and adjust speed
      const mouseVelocity = Math.min(
        Math.sqrt(deltaMouseX ** 2 + deltaMouseY ** 2) * 4,
        150
      );

      // 3. Convert mouse velocity to a value in the range [0, 0.5]
      const scaleValue = (mouseVelocity / 150) * 0.5;

      // 4. Smoothly update the current scale
      currentScale += (scaleValue - currentScale) * speed;

      // Create transformation strings
      const translateTransform = `translate(${circle.x}px, ${circle.y}px)`;
      const scaleTransform = `scale(${1 + currentScale + currentHoverScale}, ${
        1 - currentScale + currentHoverScale
      })`;

      // ROTATE
      // 1. Calculate the angle using the atan2 function
      const angle = (Math.atan2(deltaMouseY, deltaMouseX) * 180) / Math.PI;

      // 2. Check for a threshold to reduce shakiness at low mouse velocity
      if (mouseVelocity > 20) {
        currentAngle = angle;
      }

      // 3. Create a transformation string for rotation
      const rotateTransform = `rotate(${currentAngle}deg)`;

      // Apply all transformations to the circle element
      circleElement.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;

      // Request the next frame to continue the animation
      window.requestAnimationFrame(tick);
    };

    // Start the animation loop
    const animationFrame = window.requestAnimationFrame(tick);

    // Cleanup function
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div
      className="circle"
      style={{
        transformOrigin: "center center",
      }}
    ></div>
  );
}
