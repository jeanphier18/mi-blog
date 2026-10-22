"use client";

import Link from "next/link";
import { useActionState } from "react";
import { createPost, type PostFormState } from "./actions";

const initialState: PostFormState = {};

const fieldClass =
  "mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-900";

const labelClass =
  "block text-sm font-medium text-zinc-900 dark:text-zinc-100";

const errorClass = "mt-1.5 text-xs font-medium text-red-600 dark:text-red-400";

export function PostForm() {
  const [state, formAction, isPending] = useActionState(
    createPost,
    initialState,
  );

  return (
    <form action={formAction} className="mt-8 space-y-5">
      {state.error ? (
        <p
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300"
        >
          {state.error}
        </p>
      ) : null}

      <div>
        <label htmlFor="title" className={labelClass}>
          Título
        </label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="¿Sobre qué quieres escribir?"
          aria-invalid={Boolean(state.fieldErrors?.title)}
          aria-describedby={state.fieldErrors?.title ? "title-error" : undefined}
          className={fieldClass}
        />
        {state.fieldErrors?.title ? (
          <p id="title-error" className={errorClass}>
            {state.fieldErrors.title}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="tag" className={labelClass}>
          Categoría
        </label>
        <input
          id="tag"
          name="tag"
          type="text"
          placeholder="Next.js, CSS, Aprendizaje..."
          aria-invalid={Boolean(state.fieldErrors?.tag)}
          aria-describedby={state.fieldErrors?.tag ? "tag-error" : undefined}
          className={fieldClass}
        />
        {state.fieldErrors?.tag ? (
          <p id="tag-error" className={errorClass}>
            {state.fieldErrors.tag}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="excerpt" className={labelClass}>
          Resumen
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          rows={3}
          placeholder="Una o dos frases que inviten a leer el artículo."
          aria-invalid={Boolean(state.fieldErrors?.excerpt)}
          aria-describedby={
            state.fieldErrors?.excerpt ? "excerpt-error" : undefined
          }
          className={fieldClass}
        />
        {state.fieldErrors?.excerpt ? (
          <p id="excerpt-error" className={errorClass}>
            {state.fieldErrors.excerpt}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="content" className={labelClass}>
          Contenido
        </label>
        <textarea
          id="content"
          name="content"
          rows={14}
          placeholder="Escribe aquí tu artículo. Separa los párrafos con una línea en blanco."
          aria-invalid={Boolean(state.fieldErrors?.content)}
          aria-describedby={
            state.fieldErrors?.content ? "content-error" : "content-help"
          }
          className={fieldClass}
        />
        {state.fieldErrors?.content ? (
          <p id="content-error" className={errorClass}>
            {state.fieldErrors.content}
          </p>
        ) : (
          <p
            id="content-help"
            className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400"
          >
            Separa los párrafos con una línea en blanco. El tiempo de lectura se
            calcula automáticamente.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Publicando..." : "Publicar artículo"}
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-6 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
