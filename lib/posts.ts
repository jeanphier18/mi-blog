import { cacheLife, cacheTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { PostDetails, PostSummary } from "@/lib/types";

export async function getPosts(): Promise<PostSummary[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("posts");

  const posts = await prisma.post.findMany({
    orderBy: { publishedAt: "desc" },
    select: {
      id: true,
      title: true,
      excerpt: true,
      tag: true,
      readingTime: true,
      publishedAt: true,
      author: { select: { name: true } },
    },
  });

  return posts.map((post) => ({
    ...post,
    publishedAt: post.publishedAt.toISOString(),
  }));
}

export async function getPostById(id: number): Promise<PostDetails | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("posts", `post-${id}`);

  const post = await prisma.post.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      excerpt: true,
      content: true,
      tag: true,
      readingTime: true,
      publishedAt: true,
      author: { select: { name: true } },
    },
  });

  if (!post) {
    return null;
  }

  return {
    ...post,
    publishedAt: post.publishedAt.toISOString(),
  };
}
