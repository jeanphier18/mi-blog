import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Mi Blog",
    template: "%s | Mi Blog",
  },
  description:
    "Blog personal sobre desarrollo web, Next.js, TypeScript y Tailwind CSS.",
};

async function CopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-zinc-200 py-8 dark:border-zinc-800">
          <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-between gap-2 px-6 text-sm text-zinc-500 sm:flex-row dark:text-zinc-400">
            <p>© <CopyrightYear /> Mi Blog</p>
            <p>Hecho con Next.js, TypeScript y Tailwind CSS.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
