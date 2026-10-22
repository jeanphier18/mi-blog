import Link from "next/link";
import type { PostSummary } from "@/lib/types";
import { formatDate } from "@/lib/format";

export function PostCard({ post }: { post: PostSummary }) {
  return (
    <article className="h-full">
      <Link
        href={`/posts/${post.id}`}
        className="group flex h-full flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 transition duration-200 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100/60 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-indigo-700 dark:hover:shadow-none"
      >
        <div className="flex items-center justify-between gap-3 text-xs font-medium">
          <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
            {post.tag}
          </span>
          <time dateTime={post.publishedAt} className="text-zinc-500 dark:text-zinc-400">
            {formatDate(post.publishedAt)}
          </time>
        </div>

        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 transition-colors group-hover:text-indigo-600 dark:text-zinc-100 dark:group-hover:text-indigo-400">
          {post.title}
        </h2>

        <p className="line-clamp-3 flex-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-2.5 border-t border-zinc-100 pt-4 text-sm dark:border-zinc-800">
          <span
            aria-hidden="true"
            className="grid h-8 w-8 place-items-center rounded-full bg-zinc-900 text-xs font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900"
          >
            {post.author.name.charAt(0)}
          </span>
          <span className="font-medium text-zinc-900 dark:text-zinc-100">
            {post.author.name}
          </span>
          <span aria-hidden="true" className="text-zinc-400">
            ·
          </span>
          <span className="text-zinc-500 dark:text-zinc-400">
            {post.readingTime} min de lectura
          </span>
        </div>
      </Link>
    </article>
  );
}
