"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const nomes = [
  "Ana Claudia", "Carlos Eduardo", "Juliana", "Rafaela", "Fernando",
  "Patrícia", "Marcos", "Camila", "Ricardo", "Larissa",
  "Eduardo", "Letícia", "Thiago", "Gabriela", "Bruno",
  "Amanda", "Rodrigo", "Vanessa", "Felipe", "Tatiana",
  "André", "Priscila", "Lucas", "Natália", "Gustavo",
  "Carolina", "Diego", "Fernanda", "Pedro", "Isabela",
  "Leonardo", "Beatriz", "Vinícius", "Lívia", "Rafael",
  "Bianca", "Fábio", "Jéssica", "Alexandre", "Marina",
];

const sobrenomes = [
  "Silva", "Santos", "Oliveira", "Souza", "Lima",
  "Costa", "Pereira", "Almeida", "Nascimento", "Araújo",
  "Barbosa", "Ribeiro", "Martins", "Carvalho", "Gomes",
  "Melo", "Teixeira", "Rocha", "Moreira", "Correia",
  "Dias", "Freitas", "Cavalcanti", "Monteiro", "Cardoso",
];

const cidades = [
  "São Paulo - SP", "Rio de Janeiro - RJ", "Belo Horizonte - MG",
  "Curitiba - PR", "Porto Alegre - RS", "Salvador - BA",
  "Brasília - DF", "Fortaleza - CE", "Manaus - AM", "Recife - PE",
  "Goiânia - GO", "Campinas - SP", "São Luís - MA", "Natal - RN",
  "Florianópolis - SC", "Vitória - ES", "João Pessoa - PB",
  "Uberlândia - MG", "Londrina - PR", "Ribeirão Preto - SP",
  "Sorocaba - SP", "Juiz de Fora - MG", "Blumenau - SC",
  "Campo Grande - MS", "Aracaju - SE",
];

const mensagensBase = [
  "{nome} de {cidade} acabou de comprar o e-book.",
  "{nome} de {cidade} está lendo o e-book agora.",
  "{nome} de {cidade} acabou de baixar o material.",
  "{nome} de {cidade} recomendou para uma amiga.",
  "{nome} de {cidade} iniciou os exercícios hoje.",
  "{nome} de {cidade} compartilhou nas redes sociais.",
];

const tempos = [
  "agora mesmo",
  "há 2 min",
  "há 3 min",
  "há 5 min",
  "há 8 min",
  "há 12 min",
  "há 15 min",
  "há 20 min",
];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

interface ActivityNotification {
  id: number;
  message: string;
  type: "view" | "interest" | "info";
  time: string;
  avatar: string;
}

function criarNotificacao(id: number): ActivityNotification {
  const nome = `${randomItem(nomes)} ${randomItem(sobrenomes)}`;
  const cidade = randomItem(cidades);
  const base = randomItem(mensagensBase);
  const mensagem = base.replace("{nome}", nome).replace("{cidade}", cidade);
  const tipos: Array<"view" | "interest" | "info"> = ["view", "interest", "view", "interest", "info"];

  return {
    id,
    message: mensagem,
    type: randomItem(tipos),
    time: randomItem(tempos),
    avatar: `https://i.pravatar.cc/40?u=${encodeURIComponent(nome)}`,
  };
}

interface ActivityPopupProps {
  initialDelayMs?: number;
  intervalMs?: number;
  durationMs?: number;
}

export default function ActivityPopup({
  initialDelayMs = 6000,
  intervalMs = 15000,
  durationMs = 5000,
}: ActivityPopupProps) {
  const [currentNotification, setCurrentNotification] = useState<ActivityNotification | null>(null);
  const idRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const loopRef = useRef<NodeJS.Timeout | null>(null);

  const showNotification = () => {
    idRef.current += 1;
    setCurrentNotification(criarNotificacao(idRef.current));

    timerRef.current = setTimeout(() => {
      setCurrentNotification(null);
      loopRef.current = setTimeout(() => {
        showNotification();
      }, intervalMs);
    }, durationMs);
  };

  useEffect(() => {
    const initial = setTimeout(() => {
      showNotification();
    }, initialDelayMs);

    return () => {
      clearTimeout(initial);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (loopRef.current) clearTimeout(loopRef.current);
    };
  }, []);

  const handleClose = () => {
    setCurrentNotification(null);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (loopRef.current) clearTimeout(loopRef.current);
    loopRef.current = setTimeout(() => {
      showNotification();
    }, intervalMs);
  };

  return (
    <div className="fixed bottom-4 left-4 sm:top-6 sm:right-6 sm:bottom-auto sm:left-auto z-55 pointer-events-none max-w-sm w-[calc(100%-2rem)] sm:w-full">
      <AnimatePresence>
        {currentNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="pointer-events-auto w-full bg-white/90 backdrop-blur-md border border-slate-200/60 rounded-2xl shadow-xl shadow-slate-100/50 p-4 flex items-start gap-3 select-none"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 bg-slate-50 border border-slate-100">
              <img
                src={currentNotification.avatar}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0 pr-2">
              <p className="text-xs sm:text-sm font-medium text-slate-700 leading-snug">
                {currentNotification.message}
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] text-slate-400 font-medium">
                  {currentNotification.time}
                </span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="text-slate-400 hover:text-slate-700 hover:bg-slate-50 p-1 rounded-lg transition-colors cursor-pointer shrink-0"
              aria-label="Fechar notificação"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
