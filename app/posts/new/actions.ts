"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const PostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "El título debe tener al menos 3 caracteres.")
    .max(120, "El título no puede superar los 120 caracteres."),
  tag: z
    .string()
    .trim()
    .min(2, "La categoría debe tener al menos 2 caracteres.")
    .max(30, "La categoría no puede superar los 30 caracteres."),
  excerpt: z
    .string()
    .trim()
    .min(10, "El resumen debe tener al menos 10 caracteres.")
    .max(280, "El resumen no puede superar los 280 caracteres."),
  content: z
    .string()
    .trim()
    .min(20, "El contenido debe tener al menos 20 caracteres."),
});

export type PostFormState = {
  error?: string;
  fieldErrors?: Record<string, string>;
};

export async function createPost(
  _prevState: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  const parsed = PostSchema.safeParse({
    title: formData.get("title"),
    tag: formData.get("tag"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};

    for (const issue of parsed.error.issues) {
      const field = issue.path[0];

      if (typeof field === "string" && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }

    return {
      error: "Revisa los campos marcados antes de publicar.",
      fieldErrors,
    };
  }

  const user = await getCurrentUser();

  if (!user) {
    return { error: "Debes iniciar sesión para publicar un artículo." };
  }

  const { title, tag, excerpt, content } = parsed.data;
  const words = content.split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(words / 200));

  const post = await prisma.post.create({
    data: {
      title,
      tag,
      excerpt,
      content,
      readingTime,
      publishedAt: new Date(),
      authorId: user.id,
    },
  });

  updateTag("posts");
  updateTag(`post-${post.id}`);

  redirect(`/posts/${post.id}`);
}
