import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "Crear cuenta",
  description: "Regístrate para escribir y publicar artículos en el blog.",
};

export default function RegisterPage() {
  return (
    <div className="mx-auto w-full max-w-md px-6 py-12 sm:py-16">
      <Link
        href="/"
        className="text-sm font-medium text-zinc-500 transition-colors hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400"
      >
        ← Volver al inicio
      </Link>

      <header className="mt-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Crea tu cuenta
        </h1>
        <p className="mt-3 text-base leading-7 text-zinc-600 dark:text-zinc-400">
          Solo necesitas un nombre, un correo y una contraseña.
        </p>
      </header>

      <AuthForm mode="register" />
    </div>
  );
}
