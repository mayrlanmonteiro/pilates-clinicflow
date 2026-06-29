"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

export default function Book3D() {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Motion values for mouse position relative to card
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Smooth spring physics for rotations (initial values lean slightly to reveal the 3D book spine)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-35, -5]), { stiffness: 150, damping: 20 });
  
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div 
      className="relative flex items-center justify-center p-4 w-full h-[220px] sm:h-[300px] perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dynamic Floating Shadow */}
      <motion.div
        className="absolute w-[280px] h-[196px] sm:w-[370px] sm:h-[260px] bg-slate-900/10 rounded-lg blur-2xl"
        style={{
          bottom: "12%",
          scale: 0.85,
          z: -50,
          rotateX,
          rotateY: useSpring(useTransform(x, [-0.5, 0.5], [-25, -5])),
        }}
        animate={{
          y: [0, -8, 0],
          scale: [0.85, 0.9, 0.85],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* The 3D E-book Mockup Container */}
      <motion.div
        ref={cardRef}
        className="relative w-[260px] h-[183px] sm:w-[340px] sm:h-[239px] preserve-3d cursor-grab active:cursor-grabbing select-none"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          y: [0, -12, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Book Spine (3D depth edge - top edge for landscape format) */}
        <div 
          className="absolute left-0 top-0 h-[16px] w-full rounded-t-sm origin-bottom"
          style={{
            transform: "rotateX(90deg) translateZ(8px)",
            backgroundImage: "linear-gradient(to bottom, #29372c 0%, #47664e 40%, #151e16 100%)",
            boxShadow: "inset 0 -1px 2px rgba(255,255,255,0.15)",
          }}
        />

        {/* Book Front Cover */}
        <div 
          className="absolute inset-0 w-full h-full rounded-r-md overflow-hidden preserve-3d shadow-xl"
          style={{
            transform: "translateZ(10px)",
            boxShadow: "8px 8px 30px rgba(0,0,0,0.12), 1px 1px 3px rgba(255,255,255,0.2) inset",
          }}
        >
          <Image
            src="/clinicflow-cover.png"
            alt="Capa do E-book Pilates para Iniciantes - ClinicFlow"
            fill
            className="object-fill rounded-b-md"
            priority
          />
          {/* Subtle reflections overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/15 pointer-events-none rounded-r-md" />
        </div>

        {/* Book Back Cover */}
        <div 
          className="absolute inset-0 w-full h-full bg-slate-900 rounded-l-md"
          style={{
            transform: "rotateY(180deg) translateZ(10px)",
            boxShadow: "-8px 8px 30px rgba(0,0,0,0.12)",
          }}
        >
          <div className="flex flex-col justify-between h-full p-6 text-white bg-slate-900 rounded-l-md border-r border-slate-800">
            <div>
              <h4 className="text-xs font-bold text-sage-200">Pilates para Iniciantes</h4>
              <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
                Aprenda a melhorar sua postura, fortalecer o corpo inteiro e aliviar dores persistentes através do guia prático da ClinicFlow para iniciantes.
              </p>
            </div>
            <div className="border-t border-slate-800 pt-3">
              <span className="text-[8px] text-slate-500 block">Copyright © 2026.</span>
              <span className="text-[8px] text-slate-500 block">Todos os direitos reservados.</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
