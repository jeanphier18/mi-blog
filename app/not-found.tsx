import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-6 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
        Error 404
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-100">
        No encontramos esta página
      </h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        Puede que el artículo haya cambiado de lugar o que el enlace esté mal
        escrito.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
