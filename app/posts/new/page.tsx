import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getCurrentUser } from "@/lib/auth";
import { PostForm } from "./PostForm";

export const metadata: Metadata = {
  title: "Escribir artículo",
  description: "Crea y publica un nuevo artículo en el blog.",
};

export default function NewPostPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-12 sm:py-16">
      <Link
        href="/"
        className="text-sm font-medium text-zinc-500 transition-colors hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400"
      >
        ← Volver al inicio
      </Link>

      <Suspense fallback={<NewPostSkeleton />}>
        <NewPostGate />
      </Suspense>
    </div>
  );
}

async function NewPostGate() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?next=/posts/new");
  }

  return (
    <>
      <header className="mt-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950 dark:text-indigo-300">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-indigo-500"
          />
          Nuevo artículo
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-100">
          Comparte lo que estás aprendiendo
        </h1>
        <p className="mt-3 text-base leading-7 text-zinc-600 dark:text-zinc-400">
          Publicarás como <span className="font-medium">{user.name}</span>.
          Completa los campos y tu artículo aparecerá en la página de inicio.
        </p>
      </header>

      <PostForm />
    </>
  );
}

function NewPostSkeleton() {
  return (
    <div className="mt-8 animate-pulse space-y-5">
      <div className="h-6 w-40 rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-10 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-11 w-full rounded-xl bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-11 w-full rounded-xl bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-24 w-full rounded-xl bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-48 w-full rounded-xl bg-zinc-200 dark:bg-zinc-800" />
    </div>
  );
}
