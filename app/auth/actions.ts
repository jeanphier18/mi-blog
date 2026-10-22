"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSession, destroySession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export type AuthState = {
  error?: string;
};

const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Ingresa un correo válido."),
  password: z.string().min(1, "Ingresa tu contraseña."),
});

const RegisterSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres.")
    .max(50, "El nombre no puede superar los 50 caracteres."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Ingresa un correo válido.")
    .max(120, "El correo es demasiado largo."),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres.")
    .max(72, "La contraseña no puede superar los 72 caracteres."),
});

function firstError(error: z.ZodError) {
  return error.issues[0]?.message ?? "Revisa los datos ingresados.";
}

function safeNext(value: FormDataEntryValue | null) {
  if (
    typeof value === "string" &&
    value.startsWith("/") &&
    !value.startsWith("//")
  ) {
    return value;
  }

  return "/";
}

export async function login(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const parsed = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: firstError(parsed.error) };
  }

  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email },
  });

  const passwordMatches = user
    ? await bcrypt.compare(parsed.data.password, user.passwordHash)
    : false;

  if (!user || !passwordMatches) {
    return { error: "Correo o contraseña incorrectos." };
  }

  await createSession(user.id);
  redirect(safeNext(formData.get("next")));
}

export async function register(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const parsed = RegisterSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: firstError(parsed.error) };
  }

  const existing = await prisma.user.findUnique({
    where: { email: parsed.data.email },
  });

  if (existing) {
    return { error: "Ya existe una cuenta con ese correo." };
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 10);

  const user = await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      passwordHash,
    },
  });

  await createSession(user.id);
  redirect("/");
}

export async function logout() {
  await destroySession();
  redirect("/");
}
