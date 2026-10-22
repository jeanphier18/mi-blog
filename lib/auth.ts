import { createHash, randomBytes } from "node:crypto";
import { cache } from "react";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

const SESSION_COOKIE = "session";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

export type SessionUser = {
  id: number;
  name: string;
  email: string;
};

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export const getCurrentUser = cache(async (): Promise<SessionUser | null> => {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  const session = await prisma.session.findUnique({
    where: { token: hashToken(token) },
    select: {
      expiresAt: true,
      user: { select: { id: true, name: true, email: true } },
    },
  });

  if (!session || session.expiresAt.getTime() <= Date.now()) {
    return null;
  }

  return session.user;
});

export async function createSession(userId: number) {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  await prisma.session.create({
    data: { token: hashToken(token), userId, expiresAt },
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/",
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (token) {
    await prisma.session.deleteMany({ where: { token: hashToken(token) } });
  }

  cookieStore.delete(SESSION_COOKIE);
}
