"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Check, 
  X, 
  Award, 
  Sparkles, 
  BookOpen, 
  Heart, 
  Smile, 
  Activity,
  Dumbbell, 
  ShieldCheck, 
  Lock, 
  Mail, 
  Play, 
  Smartphone, 
  Tablet, 
  FileText, 
  Clock, 
  Layers, 
  ChevronRight,
  Zap,
  TrendingUp,
  Volume2
} from "lucide-react";

import Book3D from "@/components/Book3D";
import FaqAccordion from "@/components/FaqAccordion";
import TestimonialSlider from "@/components/TestimonialSlider";
import ActivityPopup from "@/components/ActivityPopup";

export default function Home() {
  // Scarcity countdown timer state (resets or counts down from 20 mins)
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 1200));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Video modal / simulation play state
  const [isPlaying, setIsPlaying] = useState(false);

  const scrollIntoView = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Animation variants for section headers and cards
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardHover = {
    hover: { y: -8, transition: { duration: 0.3, ease: "easeInOut" as const } }
  };

  return (
    <div className="overflow-x-hidden bg-slate-50 text-slate-800 relative">
      
      {/* Activity popup notification for CRO social proof */}
      <ActivityPopup initialDelayMs={6000} intervalMs={15000} durationMs={5000} />

      {/* TOP SCARCITY BANNER */}
      <div className="w-full bg-sage-900 text-white py-2 px-4 text-center text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 select-none z-40 relative">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span>Oferta especial temporária: Desconto de 60% expira em <span className="text-emerald-400 font-mono underline decoration-dotted">{formatTime(timeLeft)}</span></span>
      </div>

      {/* HERO SECTION */}
      <header className="relative bg-gradient-to-b from-sage-50/70 via-sky-light/40 to-slate-50 pt-10 pb-20 sm:pb-28">
        {/* Abstract design elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/10 rounded-full blur-3xl -z-10" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-blue-200/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header branding */}
          <div className="flex justify-between items-center mb-10 sm:mb-16">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="ClinicFlow"
                width={150}
                height={60}
                className="object-contain h-12 w-auto"
                priority
              />
            </div>

          </div>

          {/* Main Hero grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600/5 text-emerald-800 border border-emerald-600/10 text-[11px] sm:text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Método Prático e Ilustrado
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
                Descubra como o Pilates pode transformar sua postura, <span className="text-emerald-600 underline decoration-emerald-200 decoration-8 underline-offset-4">aliviar dores</span> e fortalecer seu corpo.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Aprenda exercícios práticos e seguros através de um guia digital completo, ilustrado e fácil de seguir, desenvolvido especialmente para ser praticado em casa.
              </p>

              {/* Checkmarks Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto lg:mx-0 text-left pt-2">
                {[
                  "Exercícios passo a passo",
                  "Ilustrações explicativas",
                  "Aprenda no seu ritmo",
                  "Acesso imediato no e-mail"
                ].map((bullet, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-slate-700">
                    <div className="p-1 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                    </div>
                    <span className="text-sm font-semibold">{bullet}</span>
                  </div>
                ))}
              </div>

              {/* Hero CTA buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => scrollIntoView("cta-final")}
                  className="w-full sm:w-auto px-8 py-4.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-base shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/35 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer animate-soft-pulse"
                >
                  <Zap className="w-5 h-5 fill-current" />
                  Quero Meu E-book Agora
                </button>
                <button
                  onClick={() => scrollIntoView("vsl")}
                  className="w-full sm:w-auto px-8 py-4.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-2xl font-semibold text-base shadow-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Ver Demonstração do E-book
                </button>
              </div>

              {/* Secure Checkout Seal under Hero */}
              <div className="flex items-center justify-center lg:justify-start gap-4 pt-3 text-slate-400 text-xs font-semibold">
                <div className="flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-emerald-500" />
                  Compra 100% Segura
                </div>
                <span className="h-3 w-px bg-slate-200" />
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  Garantia de 7 Dias
                </div>
              </div>
            </div>

            {/* Right mock-3D E-book mock */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <Book3D />
            </div>

          </div>
        </div>
      </header>

      {/* VSL (VIDEO SALES LETTER) SECTION */}
      <section id="vsl" className="py-14 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <div className="inline-block px-3 py-1 rounded-full bg-emerald-600/5 text-emerald-700 text-xs font-bold uppercase tracking-wider">
            Vídeo Explicativo
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Assista a uma breve demonstração do e-book
          </h2>
          <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto">
            Descubra o formato, o sumário de páginas e como colocar em prática os alongamentos no seu primeiro dia de acesso.
          </p>

          {/* Premium custom mock video player container */}
          <div className="relative aspect-video w-full max-w-3xl mx-auto bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-100 group">
            {isPlaying ? (
              <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 text-white p-6 relative">
                <button 
                  onClick={() => setIsPlaying(false)} 
                  className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1.5 rounded-lg font-bold backdrop-blur-md cursor-pointer transition-colors"
                >
                  Fechar
                </button>
                <div className="text-center space-y-4 max-w-sm">
                  <p className="text-sm text-slate-400">Exemplo: Reprodutor de vídeo será acoplado aqui.</p>
                  <p className="text-xs text-slate-500">Insira seu embed code de VSL (Youtube, Vimeo, Panda Video, Vturb, etc.) no arquivo do projeto para substituir esta simulação.</p>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 mt-4 overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[45%] animate-pulse" />
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Image 
                  src="/clinicflow-cover.png" 
                  alt="Video thumbnail placeholder" 
                  fill 
                  className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Play Button Pulsing Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/35 hover:bg-black/45 transition-colors cursor-pointer" onClick={() => setIsPlaying(true)}>
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-white/95 text-emerald-700 rounded-full flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110">
                    <span className="absolute inset-0 rounded-full bg-white animate-ping opacity-25" />
                    <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-current translate-x-0.5" />
                  </div>
                  <div className="mt-4 px-3 py-1 rounded-full bg-slate-900/75 backdrop-blur-sm text-white text-[11px] sm:text-xs font-semibold tracking-wide flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                    Clique para iniciar demonstração (1:45)
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="pt-4">
            <button
              onClick={() => scrollIntoView("cta-final")}
              className="w-full sm:w-auto px-8 py-4.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-base shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/35 transition-all transform hover:scale-[1.01] inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              Comprar E-book Agora
            </button>
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS SECTION */}
      <section className="py-14 sm:py-20 bg-slate-50/60 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Text details */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-600/5 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                Diferenciais do Guia
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight">
                Por que escolher este e-book em vez de vídeos soltos na internet?
              </h2>
              <p className="text-slate-650 text-base sm:text-lg">
                Diferente de conteúdos aleatórios do YouTube que pulam etapas e podem causar lesões, nosso e-book segue uma metodologia estruturada passo a passo de forma linear.
              </p>

              <div className="space-y-4 pt-3">
                {[
                  { title: "Linguagem simples e direta", desc: "Sem termos técnicos complicados. Qualquer pessoa consegue entender." },
                  { title: "Exercícios 100% ilustrados", desc: "Imagens claras de cada movimento para você saber exatamente o que fazer." },
                  { title: "Acesso de qualquer lugar", desc: "Salve o arquivo PDF no seu celular e assista offline, sem consumir dados." },
                  { title: "Garantia de atualização", desc: "Você recebe todas as futuras melhorias e novos bônus gratuitamente no seu e-mail." }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-emerald-50 border border-emerald-100 shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm sm:text-base">{item.title}</h4>
                      <p className="text-slate-500 text-xs sm:text-sm mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Showcase Visual of Mockups (Gallery Section) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative flex items-center justify-center h-[300px] sm:h-[450px]"
            >
              {/* Decorative backgrounds */}
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100/30 to-blue-100/30 rounded-3xl -z-10 blur-xl" />

              {/* Tablet Frame */}
              <div className="absolute w-[200px] h-[280px] sm:w-[280px] sm:h-[390px] bg-slate-900 rounded-3xl p-2 sm:p-4 shadow-2xl border-4 border-slate-800 z-10 -rotate-6 transform hover:rotate-0 transition-transform duration-300">
                <div className="relative w-full h-full bg-white rounded-2xl overflow-hidden">
                  <Image 
                    src="/clinicflow-cover.png" 
                    alt="Capa do E-book Pilates para Iniciantes" 
                    fill 
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-slate-800 rounded-full" />
                </div>
              </div>

              {/* Mobile Phone Frame Overlay */}
              <div className="absolute bottom-4 right-0 sm:right-6 w-[100px] h-[200px] sm:w-[140px] sm:h-[280px] bg-slate-950 rounded-2xl p-2 shadow-2xl border-2 border-slate-800 z-20 rotate-6 transform hover:rotate-0 transition-transform duration-300">
                <div className="relative w-full h-full bg-white rounded-xl overflow-hidden">
                  <Image 
                    src="/clinicflow-cover.png" 
                    alt="E-book no celular" 
                    fill 
                    className="object-cover"
                  />
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-10 h-3 bg-slate-950 rounded-full" />
                </div>
              </div>

            </motion.div>

          </div>

        </div>
      </section>

      {/* BENEFÍCIOS SECTION */}
      <section id="beneficios" className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-4"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-emerald-600/5 text-emerald-700 text-xs font-bold uppercase tracking-wider">
              Benefícios Reais
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              O que o Pilates pode fazer pela sua vida todos os dias?
            </h2>
            <p className="text-slate-500 text-base sm:text-lg">
              Praticar de forma regular, mesmo que apenas 15 minutos por dia, promove uma transformação profunda no seu corpo e na sua mente.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {/* Benefit Card 1 */}
            <motion.div variants={fadeIn} whileHover="hover" className="border border-slate-100/80 rounded-3xl p-8 bg-slate-50/50 hover:bg-white hover:shadow-xl hover:border-emerald-100 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 border border-emerald-100/50">
                <Activity className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Melhora da postura</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Realinha a coluna e desenvolve a consciência corporal necessária para manter a postura correta e elegante ao longo do dia, reduzindo o estresse físico.
              </p>
            </motion.div>

            {/* Benefit Card 2 */}
            <motion.div variants={fadeIn} whileHover="hover" className="border border-slate-100/80 rounded-3xl p-8 bg-slate-50/50 hover:bg-white hover:shadow-xl hover:border-emerald-100 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 border border-emerald-100/50">
                <Dumbbell className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Fortalecimento muscular</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Trabalha o fortalecimento global e profundo do corpo inteiro, com foco especial no abdômen, na lombar e nos músculos estabilizadores (Powerhouse).
              </p>
            </motion.div>

            {/* Benefit Card 3 */}
            <motion.div variants={fadeIn} whileHover="hover" className="border border-slate-100/80 rounded-3xl p-8 bg-slate-50/50 hover:bg-white hover:shadow-xl hover:border-emerald-100 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 border border-emerald-100/50">
                <Layers className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Mais flexibilidade</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Alongamento e flexibilidade integrados nos movimentos. Reduz a rigidez muscular geral, promovendo uma movimentação mais livre e fluida.
              </p>
            </motion.div>

            {/* Benefit Card 4 */}
            <motion.div variants={fadeIn} whileHover="hover" className="border border-slate-100/80 rounded-3xl p-8 bg-slate-50/50 hover:bg-white hover:shadow-xl hover:border-emerald-100 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 border border-emerald-100/50">
                <ShieldCheck className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Alívio de dores</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Excelente para reduzir dores crônicas na lombar, ombros e pescoço, promovendo descompressão vertebral por meio do alongamento ativo.
              </p>
            </motion.div>

            {/* Benefit Card 5 */}
            <motion.div variants={fadeIn} whileHover="hover" className="border border-slate-100/80 rounded-3xl p-8 bg-slate-50/50 hover:bg-white hover:shadow-xl hover:border-emerald-100 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 border border-emerald-100/50">
                <TrendingUp className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Mais equilíbrio</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Melhora o controle motor fino, o equilíbrio postural estático e dinâmico, prevenindo quedas e melhorando a performance em outros esportes.
              </p>
            </motion.div>

            {/* Benefit Card 6 */}
            <motion.div variants={fadeIn} whileHover="hover" className="border border-slate-100/80 rounded-3xl p-8 bg-slate-50/50 hover:bg-white hover:shadow-xl hover:border-emerald-100 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 border border-emerald-100/50">
                <Smile className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Mais qualidade de vida</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Aumenta os níveis de energia, diminui a fadiga diária e estimula a clareza mental e a respiração consciente, ajudando a aliviar o estresse.
              </p>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* PARA QUEM É / PARA QUEM NÃO É */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-4"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-emerald-600/5 text-emerald-700 text-xs font-bold uppercase tracking-wider">
              Qualificação de Compra
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Para quem este e-book é indicado?
            </h2>
            <p className="text-slate-500 text-base sm:text-lg">
              Veja se você se identifica com as metas e o método que estruturamos neste material.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* PARA QUEM É */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-emerald-50/20 border border-emerald-100 rounded-3xl p-8 sm:p-10 space-y-6 shadow-sm"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                <span className="p-1 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Check className="w-5 h-5 stroke-[2.5]" />
                </span>
                Este material é ideal para:
              </h3>
              <ul className="space-y-4">
                {[
                  "Iniciantes absolutos no Pilates que desejam começar em casa com segurança.",
                  "Pessoas que passam horas sentadas e desejam melhorar sua postura.",
                  "Quem sofre com dores recorrentes nas costas e articulações.",
                  "Pessoas sedentárias que desejam voltar a se mover com suavidade.",
                  "Quem deseja conquistar mais flexibilidade e consciência corporal no dia a dia."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* PARA QUEM NÃO É */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-red-50/10 border border-red-100/60 rounded-3xl p-8 sm:p-10 space-y-6 shadow-sm"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                <span className="p-1 rounded-xl bg-red-50 text-red-700 flex items-center justify-center">
                  <X className="w-5 h-5 stroke-[2.5]" />
                </span>
                Este material NÃO é indicado para:
              </h3>
              <ul className="space-y-4">
                {[
                  "Pessoas que buscam fórmulas mágicas sem precisar fazer exercícios.",
                  "Praticantes avançados que esperam acrobacias ou aparelhos complexos.",
                  "Pessoas com lesões agudas graves que requerem atendimento médico presencial imediato.",
                  "Quem não está disposto a ler o guia e seguir as orientações passo a passo.",
                  "Quem procura um livro impresso entregue pelos correios (o material é 100% digital)."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-555">
                    <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

          </div>
        </div>
      </section>

      {/* DEPOIMENTOS SECTION */}
      <section id="depoimentos" className="py-14 sm:py-20 bg-slate-50/60 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-4"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-emerald-600/5 text-emerald-700 text-xs font-bold uppercase tracking-wider">
              Avaliações de Clientes
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              O que dizem sobre nosso material?
            </h2>
            <p className="text-slate-500 text-base sm:text-lg">
              Veja abaixo a opinião simulada de compradores enquanto coletamos depoimentos reais dos novos alunos.
            </p>
          </motion.div>

          <TestimonialSlider />

        </div>
      </section>

      {/* GARANTIA SECTION */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="border border-slate-100 rounded-[32px] p-8 sm:p-12 bg-slate-50/50 flex flex-col md:flex-row items-center gap-8 shadow-sm">
            <div className="relative shrink-0">
              {/* Golden circular badge mockup */}
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center shadow-lg shadow-amber-500/10">
                <div className="w-[94%] h-[94%] rounded-full border-2 border-white/60 flex flex-col items-center justify-center text-center p-3 text-white">
                  <Award className="w-7 h-7 sm:w-10 sm:h-10 mb-0.5 stroke-[1.5]" />
                  <span className="text-[10px] sm:text-xs font-extrabold tracking-wide">GARANTIA</span>
                  <span className="text-xs sm:text-sm font-extrabold tracking-tight">7 DIAS</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Garantia de Satisfação de 7 Dias Incondicional
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Experimente o e-book de Pilates em Casa sem riscos. Se em até 7 dias você achar que o conteúdo não é para você, basta solicitar o reembolso na plataforma de pagamento. Devolveremos 100% do seu dinheiro, sem burocracia ou perguntas.
              </p>
              <div className="text-[11px] text-slate-400 font-semibold pt-1 uppercase tracking-wider flex items-center justify-center md:justify-start gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Segurança garantida por lei (Art. 49 do CDC)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-14 sm:py-20 bg-slate-50/60 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-4"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-emerald-600/5 text-emerald-700 text-xs font-bold uppercase tracking-wider">
              Dúvidas Frequentes
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Perguntas Frequentes
            </h2>
            <p className="text-slate-500 text-base sm:text-lg">
              Ficou com alguma dúvida? Confira as respostas para as perguntas mais comuns dos nossos leitores.
            </p>
          </motion.div>

          <FaqAccordion />

        </div>
      </section>

      {/* CTA FINAL SECTION */}
      <section id="cta-final" className="relative py-14 sm:py-20 bg-slate-900 text-white overflow-hidden">
        {/* Glowing visual effect circles */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10" />
        <div className="absolute top-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-4xl mx-auto px-6 text-center space-y-8 relative z-10">
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            Oferta com tempo limitado!
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
            Pronto para conquistar um corpo mais saudável e livre de dores?
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto font-light">
            Tenha acesso imediato ao E-book completo de Pilates em Casa + bônus exclusivos.
          </p>

          {/* PRICING CARD */}
          <div className="max-w-md mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 sm:p-10 text-center space-y-6 shadow-2xl">
            <div className="space-y-1">
              <span className="text-slate-400 line-through text-sm font-medium">De R$ 97,00</span>
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl font-bold text-slate-300 self-start mt-2">Por apenas</span>
                <span className="text-5xl sm:text-6xl font-black text-white tracking-tight">R$ 37</span>
                <span className="text-xl font-bold text-slate-300 self-end mb-2">,90</span>
              </div>
              <span className="text-[11px] text-emerald-400 font-semibold block uppercase tracking-wide">
                Pagamento único • Sem mensalidades
              </span>
            </div>

            {/* Timer inside Pricing */}
            <div className="py-2.5 px-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold select-none">
              <span>Desconto de 60% expira em:</span>
              <span className="text-emerald-400 font-mono underline decoration-emerald-500/30 font-bold tracking-wider">{formatTime(timeLeft)}</span>
            </div>

            <div className="space-y-4">
              <a
                href="https://pay.hotmart.com/mock-link-check-out"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-lg rounded-2xl shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5 fill-current text-slate-950" />
                Quero Meu E-book Agora
              </a>

              <div className="flex items-center justify-center gap-4 text-[10px] sm:text-xs text-slate-400 font-medium pt-2">
                <span className="flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  Privacidade protegida
                </span>
                <span className="h-2 w-px bg-slate-700" />
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Download imediato
                </span>
              </div>
            </div>
          </div>

          {/* Secure Icons */}
          <div className="flex flex-col items-center gap-3 text-slate-400 text-xs font-semibold pt-4">
            <span>PLATAFORMA 100% CRIPTOGRAFADA E HOMOLOGADA</span>
            <div className="flex items-center gap-4 opacity-60">
              {/* Small lock visual badge */}
              <div className="border border-slate-700 px-3 py-1.5 rounded-lg text-[10px]">COMPRA CRIPTOGRAFADA</div>
              <div className="border border-slate-700 px-3 py-1.5 rounded-lg text-[10px]">PIX IMEDIATO</div>
              <div className="border border-slate-700 px-3 py-1.5 rounded-lg text-[10px]">REEMBOLSO GARANTIDO</div>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-xs sm:text-sm py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="ClinicFlow"
                width={130}
                height={52}
                className="object-contain h-10 w-auto brightness-0 invert"
              />
            </div>

            {/* Footer menu */}
            <div className="flex flex-wrap justify-center gap-6 text-xs font-bold text-slate-400">
              <a href="#beneficios" className="hover:text-white transition-colors">Benefícios</a>
              <a href="#vsl" className="hover:text-white transition-colors">Demonstração</a>
              <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
              <span className="text-slate-700">|</span>
              <a href="/politicas-privacidade" className="hover:text-white transition-colors">Políticas de Privacidade</a>
              <a href="/termos-uso" className="hover:text-white transition-colors">Termos de Uso</a>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-[11px] text-slate-500">
            <div className="space-y-1 max-w-xl">
              <p>Copyright © 2026 ClinicFlow. Todos os direitos reservados.</p>
              <p className="leading-relaxed">
                Aviso Legal: Os resultados podem variar de pessoa para pessoa. As orientações contidas neste material não substituem aconselhamento médico ou sessões de fisioterapia individualizadas. Consulte sempre seu médico antes de iniciar novos exercícios físicos.
              </p>
            </div>

            {/* Social / Contact */}
            <div className="space-y-2 flex flex-col items-center md:items-end">
              <span className="font-bold text-slate-450 uppercase text-[9px] tracking-wider">Fale Conosco</span>
              <div className="flex items-center gap-4 text-slate-400 text-xs">
                <a href="mailto:contato@clinicflow.com.br" className="flex items-center gap-1 hover:text-white transition-colors font-medium">
                  <Mail className="w-3.5 h-3.5 text-slate-450" />
                  contato@clinicflow.com.br
                </a>
                <a href="https://instagram.com/clinicflow" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition-colors font-medium">
                  <svg className="w-3.5 h-3.5 text-slate-450" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                  @clinicflow
                </a>
              </div>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
