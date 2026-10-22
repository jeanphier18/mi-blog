import { PostCard } from "@/components/PostCard";
import { getPosts } from "@/lib/posts";

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-12 sm:py-16">
      <section className="max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950 dark:text-indigo-300">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-indigo-500"
          />
          Blog personal
        </span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-100">
          Ideas, notas y aprendizajes sobre desarrollo web.
        </h1>
        <p className="mt-5 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          Un espacio donde documento lo que voy aprendiendo mientras construyo
          proyectos con Next.js, TypeScript y Tailwind CSS.
        </p>
      </section>

      <section className="mt-12">
        <div className="flex items-baseline justify-between gap-4 border-b border-zinc-200 pb-4 dark:border-zinc-800">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Últimos artículos
          </h2>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            {posts.length} artículos
          </span>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
