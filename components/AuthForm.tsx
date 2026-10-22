"use client";

import Link from "next/link";
import { useActionState } from "react";
import { login, register, type AuthState } from "@/app/auth/actions";

const initialState: AuthState = {};

const fieldClass =
  "mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-900";

const labelClass =
  "block text-sm font-medium text-zinc-900 dark:text-zinc-100";

type AuthFormProps = {
  mode: "login" | "register";
  redirectTo?: string;
};

export function AuthForm({ mode, redirectTo = "/" }: AuthFormProps) {
  const isLogin = mode === "login";
  const action = isLogin ? login : register;
  const [state, formAction, isPending] = useActionState(action, initialState);

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

      {!isLogin ? (
        <div>
          <label htmlFor="name" className={labelClass}>
            Nombre
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Tu nombre"
            className={fieldClass}
          />
        </div>
      ) : null}

      <div>
        <label htmlFor="email" className={labelClass}>
          Correo electrónico
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="tu@correo.com"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="password" className={labelClass}>
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete={isLogin ? "current-password" : "new-password"}
          placeholder={isLogin ? "Tu contraseña" : "Mínimo 8 caracteres"}
          className={fieldClass}
        />
      </div>

      <input type="hidden" name="next" value={redirectTo} />

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending
          ? isLogin
            ? "Entrando..."
            : "Creando cuenta..."
          : isLogin
            ? "Iniciar sesión"
            : "Crear cuenta"}
      </button>

      <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
        {isLogin ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
        <Link
          href={isLogin ? "/register" : "/login"}
          className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          {isLogin ? "Regístrate" : "Inicia sesión"}
        </Link>
      </p>
    </form>
  );
}
