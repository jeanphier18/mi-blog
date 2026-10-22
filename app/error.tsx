"use client";

import Link from "next/link";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-6 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-red-600 dark:text-red-400">
        Algo salió mal
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-100">
        No pudimos cargar esta página
      </h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        Intenta recargar la página. Si el problema continúa, vuelve al inicio.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
        >
          Reintentar
        </button>
        <Link
          href="/"
          className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
