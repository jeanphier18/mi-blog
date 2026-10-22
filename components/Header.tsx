import Link from "next/link";
import { Suspense } from "react";
import { logout } from "@/app/auth/actions";
import { getCurrentUser } from "@/lib/auth";

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 w-full max-w-4xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
        >
          <span
            aria-hidden="true"
            className="grid h-8 w-8 place-items-center rounded-lg bg-indigo-600 text-sm font-bold text-white"
          >
            M
          </span>
          Mi Blog
        </Link>

        <nav className="flex items-center gap-1 text-sm font-medium">
          <Link
            href="/"
            className="rounded-md px-3 py-2 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
          >
            Inicio
          </Link>
          <Suspense
            fallback={
              <div className="h-9 w-24 animate-pulse rounded-full bg-zinc-100 dark:bg-zinc-900" />
            }
          >
            <AuthNav />
          </Suspense>
        </nav>
      </div>
    </header>
  );
}

async function AuthNav() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <>
        <Link
          href="/login"
          className="rounded-md px-3 py-2 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
        >
          Entrar
        </Link>
        <Link
          href="/register"
          className="rounded-full bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-500"
        >
          Crear cuenta
        </Link>
      </>
    );
  }

  return (
    <>
      <Link
        href="/posts/new"
        className="rounded-full bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-500"
      >
        Escribir
      </Link>
      <span className="hidden px-2 text-zinc-600 sm:inline dark:text-zinc-400">
        {user.name}
      </span>
      <form action={logout}>
        <button
          type="submit"
          className="rounded-md px-3 py-2 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
        >
          Salir
        </button>
      </form>
    </>
  );
}
