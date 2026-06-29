"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "Como recebo o e-book?",
    answer: "O envio é 100% digital e automático. Assim que o pagamento for confirmado, você receberá um link de download no e-mail cadastrado na compra, podendo acessá-lo imediatamente.",
  },
  {
    question: "Em quanto tempo terei acesso?",
    answer: "Imediatamente após a confirmação do pagamento. Pagamentos via Pix e Cartão de Crédito são aprovados instantaneamente e o acesso é enviado na mesma hora. Boletos bancários podem levar de 1 a 2 dias úteis para compensação.",
  },
  {
    question: "Posso acessar pelo celular?",
    answer: "Sim! O e-book está no formato PDF de alta qualidade e foi otimizado para leitura confortável em qualquer dispositivo: celular, tablet, computador ou leitor de e-books.",
  },
  {
    question: "Preciso de internet para ler?",
    answer: "Não! Após fazer o download do arquivo PDF uma vez para o seu celular ou computador, você poderá lê-lo offline a qualquer momento, sem precisar gastar seus dados de internet.",
  },
  {
    question: "É indicado para iniciantes?",
    answer: "Sim, é perfeito para iniciantes! Todos os exercícios são explicados de forma simples, com ilustrações detalhadas e orientações de segurança para que você comece do absoluto zero, no seu próprio ritmo.",
  },
  {
    question: "O pagamento é seguro?",
    answer: "Totalmente seguro. Nós utilizamos as maiores e mais seguras plataformas de pagamentos para infoprodutos do Brasil. Seus dados estão 100% protegidos por criptografia de ponta a ponta.",
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="border border-slate-200/80 rounded-2xl bg-white hover:border-slate-300 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md"
          >
            <button
              onClick={() => toggleFaq(index)}
              className="flex justify-between items-center w-full px-6 py-5 text-left text-slate-800 font-semibold focus:outline-none transition-colors duration-200 hover:text-sage-600 cursor-pointer"
            >
              <span className="text-base sm:text-lg pr-4 font-semibold text-slate-800">{faq.question}</span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="text-slate-400 bg-slate-50 p-2 rounded-xl shrink-0"
              >
                <ChevronDown className="w-5 h-5 text-slate-500" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-6 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100/50 pt-3">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
