"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  city: string;
  text: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Ana Claudia Martins",
    city: "Belo Horizonte - MG",
    text: "Nunca imaginei que conseguiria aprender Pilates em casa. O guia é tão bem explicado e as ilustrações são claras que já na primeira semana senti diferença na postura. Minhas dores na lombar diminuíram muito! Recomendo de olhos fechados.",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    name: "Carlos Eduardo Lima",
    city: "Curitiba - PR",
    text: "Trabalho o dia todo sentado no escritório e minha coluna estava travada. Com apenas 15 minutos por dia seguindo o e-book, consegui aliviar tensões que eu carregava há anos. O melhor investimento que fiz na minha saúde esse ano!",
    avatar: "https://i.pravatar.cc/150?img=53",
  },
  {
    name: "Juliana Freitas",
    city: "Rio de Janeiro - RJ",
    text: "Já tinha tentado vídeos no YouTube mas sempre me lesionava. A metodologia passo a passo do e-book me deu segurança pra praticar. Em 3 semanas já consigo sentir meu core mais forte e minha postura muito mais alinhada. Simplesmente transformador!",
    avatar: "https://i.pravatar.cc/150?img=23",
  },
  {
    name: "Rafaela Oliveira",
    city: "Porto Alegre - RS",
    text: "Comprei pensando em melhorar a flexibilidade, mas ganhei muito mais: disposição, menos dores e uma consciência corporal que levo pra vida toda. As ilustrações são um diferencial enorme, nunca precisei reler nenhuma explicação. Perfeito!",
    avatar: "https://i.pravatar.cc/150?img=44",
  },
  {
    name: "Patrícia Almeida",
    city: "Brasília - DF",
    text: "Mãe de dois filhos pequenos, não tenho tempo nem dinheiro pra academia. Esse e-book foi a solução que eu precisava: prático, barato e cabe na minha rotina. Faço enquanto as crianças dormem e já perdi 4cm de cintura em 2 meses!",
    avatar: "https://i.pravatar.cc/150?img=16",
  },
  {
    name: "Fernando Santos",
    city: "Salvador - BA",
    text: "Sou fisioterapeuta e recomendei o e-book pra vários pacientes. A qualidade do conteúdo, a progressão dos exercícios e o cuidado com a segurança são impressionantes. Pra quem quer começar Pilates em casa de forma correta, é o melhor material que existe.",
    avatar: "https://i.pravatar.cc/150?img=60",
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

export default function TestimonialSlider() {
  const [[index, direction], setPage] = useState([0, 0]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const paginate = useCallback(
    (newDirection: number) => {
      setPage((prev) => {
        const nextIndex =
          (prev[0] + newDirection + testimonials.length) % testimonials.length;
        return [nextIndex, newDirection];
      });
      setIsAutoPlaying(false);
      setTimeout(() => setIsAutoPlaying(true), 6000);
    },
    []
  );

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setPage((prev) => {
        const nextIndex = (prev[0] + 1) % testimonials.length;
        return [nextIndex, 1];
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <div className="relative max-w-4xl mx-auto px-4 py-8 select-none">
      <div className="overflow-hidden relative bg-white border border-slate-100 rounded-3xl p-8 sm:p-12 shadow-lg shadow-slate-100/50">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Stars */}
          <div className="flex space-x-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>

          {/* Testimonial content with lateral slide */}
          <div className="min-h-[160px] sm:min-h-[140px] flex items-center justify-center w-full relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="w-full flex flex-col items-center"
              >
                <Quote className="w-8 h-8 text-emerald-200 mb-2 shrink-0" />
                <p className="text-base sm:text-lg lg:text-xl text-slate-600 italic leading-relaxed max-w-2xl">
                  &ldquo;{testimonials[index].text}&rdquo;
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Customer info with photo */}
          <div className="flex flex-col items-center space-y-3 pt-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-emerald-100 shadow-sm shrink-0">
              <img
                src={testimonials[index].avatar}
                alt={testimonials[index].name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center">
              <h5 className="font-bold text-slate-800">
                {testimonials[index].name}
              </h5>
              <p className="text-xs text-slate-400 mt-0.5">
                {testimonials[index].city}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-center items-center space-x-6 mt-6">
        <button
          onClick={() => paginate(-1)}
          className="p-3 bg-white border border-slate-200 rounded-full text-slate-600 hover:bg-slate-50 hover:text-sage-600 hover:border-sage-300 transition-all shadow-sm cursor-pointer"
          aria-label="Depoimento anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Indicators */}
        <div className="flex space-x-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setPage([i, i > index ? 1 : -1]);
                setIsAutoPlaying(false);
                setTimeout(() => setIsAutoPlaying(true), 6000);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                index === i
                  ? "bg-sage-600 w-6"
                  : "bg-slate-200 hover:bg-slate-300"
              }`}
              aria-label={`Ir para depoimento ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => paginate(1)}
          className="p-3 bg-white border border-slate-200 rounded-full text-slate-600 hover:bg-slate-50 hover:text-sage-600 hover:border-sage-300 transition-all shadow-sm cursor-pointer"
          aria-label="Próximo depoimento"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
