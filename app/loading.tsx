export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-4xl animate-pulse px-6 py-12 sm:py-16">
      <div className="h-6 w-32 rounded-full bg-zinc-200 dark:bg-zinc-800" />
      <div className="mt-6 h-12 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="mt-4 h-4 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        <div className="h-56 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-56 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
      </div>
    </div>
  );
}
