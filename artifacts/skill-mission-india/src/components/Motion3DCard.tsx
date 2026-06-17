"use client";

import { useRef, type CSSProperties, type MouseEvent, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

export type Motion3DCardProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  tilt?: number;
  hoverScale?: number;
  lift?: number;
  glare?: boolean;
  shadow?: boolean;
  style?: CSSProperties;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  "data-testid"?: string;
};

export function Motion3DCard({
  children,
  className = "",
  innerClassName = "",
  tilt = 14,
  hoverScale = 1.04,
  lift = 10,
  glare = true,
  shadow = true,
  style,
  onMouseEnter,
  onMouseLeave,
  "data-testid": testId,
}: Motion3DCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const isHovered = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(my, [-0.5, 0.5], reduceMotion ? [0, 0] : [tilt, -tilt]),
    { stiffness: 280, damping: 26 }
  );
  const rotateY = useSpring(
    useTransform(mx, [-0.5, 0.5], reduceMotion ? [0, 0] : [-tilt, tilt]),
    { stiffness: 280, damping: 26 }
  );
  const scale = useSpring(1, { stiffness: 280, damping: 26 });
  const translateY = useSpring(0, { stiffness: 280, damping: 26 });

  const glareX = useTransform(mx, [-0.5, 0.5], [15, 85]);
  const glareY = useTransform(my, [-0.5, 0.5], [15, 85]);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.45) 0%, transparent 58%)`;
  const glareOpacity = useTransform(isHovered, [0, 1], [0, 1]);

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleEnter() {
    if (!reduceMotion) {
      scale.set(hoverScale);
      translateY.set(-lift);
      isHovered.set(1);
    }
    onMouseEnter?.();
  }

  function handleLeave() {
    mx.set(0);
    my.set(0);
    scale.set(1);
    translateY.set(0);
    isHovered.set(0);
    onMouseLeave?.();
  }

  return (
    <div className={`perspective-[1200px] h-full ${className}`} data-testid={testId}>
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        style={{
          rotateX,
          rotateY,
          scale,
          y: translateY,
          transformStyle: "preserve-3d",
          ...style,
        }}
        className={`relative h-full will-change-transform rounded-[inherit] ${
          shadow ? "transition-shadow duration-300 hover:shadow-2xl hover:shadow-orange-400/25" : ""
        } ${innerClassName}`}
      >
        {children}
        {glare && !reduceMotion && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] mix-blend-overlay"
            style={{ background: glareBg, opacity: glareOpacity }}
          />
        )}
      </motion.div>
    </div>
  );
}
