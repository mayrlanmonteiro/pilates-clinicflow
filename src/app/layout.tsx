import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ClinicFlow",
  description: "Descubra como o Pilates pode transformar sua postura, aliviar dores e melhorar sua qualidade de vida com um guia prático, ilustrado e fácil de seguir. Comece hoje mesmo!",
  keywords: ["pilates em casa", "exercicios de pilates", "corrigir postura", "aliviar dor nas costas", "alongamento pilates", "fortalecimento pilates", "qualidade de vida"],
  authors: [{ name: "Fisioterapia Integrada" }],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "ClinicFlow",
    description: "Aprenda exercícios de Pilates de forma simples e ilustrada para aliviar dores nas costas e melhorar sua postura.",
    images: ["/clinicflow-cover.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClinicFlow",
    description: "Aprenda exercícios de Pilates de forma simples e ilustrada para aliviar dores nas costas e melhorar sua postura.",
    images: ["/clinicflow-cover.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${plusJakarta.variable} h-full scroll-smooth antialiased`}
    >
      <body className="font-sans min-h-full flex flex-col bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}

