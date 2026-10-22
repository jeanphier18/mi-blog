import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getPostById } from "@/lib/posts";
import { formatDate } from "@/lib/format";

export async function generateMetadata(props: PageProps<"/posts/[id]">) {
  const { id } = await props.params;
  const postId = Number(id);

  if (!Number.isInteger(postId)) {
    return { title: "Artículo no encontrado" };
  }

  const post = await getPostById(postId);

  if (!post) {
    return { title: "Artículo no encontrado" };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default function PostPage(props: PageProps<"/posts/[id]">) {
  return (
    <Suspense fallback={<PostSkeleton />}>
      <PostContent params={props.params} />
    </Suspense>
  );
}

async function PostContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const postId = Number(id);

  if (!Number.isInteger(postId)) {
    notFound();
  }

  const post = await getPostById(postId);

  if (!post) {
    notFound();
  }

  const paragraphs = post.content.split("\n\n");

  return (
    <article className="mx-auto w-full max-w-2xl px-6 py-12 sm:py-16">
      <Link
        href="/"
        className="text-sm font-medium text-zinc-500 transition-colors hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400"
      >
        ← Volver al inicio
      </Link>

      <header className="mt-8">
        <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
            {post.tag}
          </span>
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime} min de lectura</span>
        </div>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-100">
          {post.title}
        </h1>

        <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          {post.excerpt}
        </p>
      </header>

      <div className="mt-10 space-y-6 border-t border-zinc-200 pt-8 text-base leading-8 text-zinc-700 dark:border-zinc-800 dark:text-zinc-300">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <footer className="mt-12 flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
        <span
          aria-hidden="true"
          className="grid h-11 w-11 place-items-center rounded-full bg-indigo-600 text-sm font-semibold text-white"
        >
          {post.author.name.charAt(0)}
        </span>
        <div>
          <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Escrito por
          </p>
          <p className="font-medium text-zinc-900 dark:text-zinc-100">
            {post.author.name}
          </p>
        </div>
      </footer>
    </article>
  );
}

function PostSkeleton() {
  return (
    <div className="mx-auto w-full max-w-2xl animate-pulse px-6 py-12 sm:py-16">
      <div className="h-4 w-32 rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="mt-8 flex gap-3">
        <div className="h-5 w-20 rounded-full bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-5 w-28 rounded bg-zinc-200 dark:bg-zinc-800" />
      </div>
      <div className="mt-4 h-10 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="mt-4 h-4 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="mt-10 space-y-3 border-t border-zinc-200 pt-8 dark:border-zinc-800">
        <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-4 w-11/12 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-4 w-10/12 rounded bg-zinc-200 dark:bg-zinc-800" />
      </div>
    </div>
  );
}
