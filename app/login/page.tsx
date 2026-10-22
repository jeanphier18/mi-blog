import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AuthForm } from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "Iniciar sesión",
  description: "Accede a tu cuenta para escribir y publicar artículos.",
};

export default function LoginPage(props: PageProps<"/login">) {
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
          Inicia sesión
        </h1>
        <p className="mt-3 text-base leading-7 text-zinc-600 dark:text-zinc-400">
          Accede para escribir y publicar nuevos artículos.
        </p>
      </header>

      <Suspense
        fallback={
          <p className="mt-8 text-sm text-zinc-500 dark:text-zinc-400">
            Cargando formulario...
          </p>
        }
      >
        <LoginForm searchParams={props.searchParams} />
      </Suspense>
    </div>
  );
}

async function LoginForm({
  searchParams,
}: Pick<PageProps<"/login">, "searchParams">) {
  const { next } = await searchParams;

  const redirectTo =
    typeof next === "string" && next.startsWith("/") && !next.startsWith("//")
      ? next
      : "/";

  return <AuthForm mode="login" redirectTo={redirectTo} />;
}
