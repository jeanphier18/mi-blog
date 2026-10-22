import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const demoPasswordHash = bcrypt.hashSync("password123", 10);

const connectionString =
  process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "Falta DATABASE_URL_UNPOOLED o DATABASE_URL. Ejecuta `neon env pull` y vuelve a intentarlo.",
  );
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

type DemoAuthor = "jean" | "ana";

const posts: {
  title: string;
  excerpt: string;
  tag: string;
  readingTime: number;
  author: DemoAuthor;
  publishedAt: Date;
  content: string;
}[] = [
  {
    title: "Cómo empecé a aprender desarrollo web",
    excerpt:
      "El primer paso no es elegir el framework perfecto, sino perder el miedo a romper cosas. Así fue mi punto de partida.",
    tag: "Aprendizaje",
    readingTime: 6,
    author: "jean",
    publishedAt: new Date("2026-10-01T10:00:00.000Z"),
    content: [
      "Durante mucho tiempo pensé que aprender a programar era memorizar una lista infinita de conceptos. La realidad es bastante más sencilla: se trata de construir cosas pequeñas, equivocarse rápido y entender el error antes de pasar al siguiente paso.",
      "Mi primer proyecto fue una página con un título, una imagen y un botón que cambiaba el color de fondo. No era impresionante, pero funcionaba, y eso cambió mi forma de ver el aprendizaje. Cada funcionalidad que agregaba me obligaba a leer documentación y a probar ideas en el navegador.",
      "Con el tiempo descubrí que la constancia importa más que la intensidad. Veinte minutos al día, todos los días, me llevaron más lejos que una tarde entera de estudio una vez al mes.",
      "Si estás empezando, mi consejo es simple: elige un proyecto que te divierta, divídelo en pasos diminutos y celebra cada avance. La motivación llega cuando ves tus ideas funcionando.",
    ].join("\n\n"),
  },
  {
    title: "Next.js 16: lo que necesitas saber antes de empezar",
    excerpt:
      "El App Router, los Server Components y los cambios recientes de Next.js explicados sin jerga innecesaria.",
    tag: "Next.js",
    readingTime: 8,
    author: "ana",
    publishedAt: new Date("2026-10-10T10:00:00.000Z"),
    content: [
      "Next.js combina frontend y backend en un mismo proyecto, lo que lo convierte en una opción muy cómoda para aprender desarrollo web completo. La clave está en el App Router: cada carpeta dentro de app representa una ruta y cada archivo page.tsx define lo que se muestra en ella.",
      "Los Server Components se ejecutan en el servidor por defecto. Eso significa que puedes leer datos, consultar una base de datos o acceder a una API sin exponer credenciales al navegador. Cuando necesitas interactividad, agregas la directiva use client a un componente concreto.",
      "En las versiones recientes, los parámetros de ruta son asíncronos. En una página dinámica ya no se escribe params.id directamente: hay que esperar la promesa con await params antes de usar el valor.",
      "Mi recomendación para empezar es no memorizar la API completa. Construye una página, luego una ruta dinámica, después un formulario. La documentación está muy bien organizada y cada concepto se entiende mejor cuando lo usas.",
    ].join("\n\n"),
  },
  {
    title: "Tailwind CSS sin miedo: mi flujo de trabajo",
    excerpt:
      "Cómo dejé de pelear con las clases utilitarias y empecé a diseñar interfaces más rápido.",
    tag: "CSS",
    readingTime: 5,
    author: "jean",
    publishedAt: new Date("2026-10-15T10:00:00.000Z"),
    content: [
      "Al principio Tailwind me parecía un archivo HTML lleno de ruido. ¿Por qué escribir veinte clases en lugar de tres líneas de CSS? La respuesta apareció cuando empecé a iterar sobre diseños reales: cambiar un color o un espaciado es editar una clase, no inventar un nuevo nombre.",
      "Mi flujo es sencillo. Primero maqueto la estructura con divs y etiquetas semánticas, sin preocuparme por el estilo. Después aplico espaciado, tipografía y colores de forma incremental. Al final reviso el modo oscuro y los tamaños de pantalla pequeños.",
      "También uso un pequeño conjunto de decisiones reutilizables: bordes redondeados de 1rem para tarjetas, zinc para textos neutros e índigo como color de acento. La consistencia hace que la interfaz se sienta intencional sin necesidad de un sistema de diseño complejo.",
      "Tailwind no reemplaza saber CSS. Al contrario: te obliga a entender qué hace cada propiedad. Pero una vez que lo dominas, moverte de la idea al pixel se vuelve mucho más rápido.",
    ].join("\n\n"),
  },
  {
    title: "El arte de escribir un buen README",
    excerpt:
      "Tu proyecto no termina cuando funciona. Termina cuando otra persona puede entenderlo y ejecutarlo sin ayuda.",
    tag: "Buenas prácticas",
    readingTime: 4,
    author: "ana",
    publishedAt: new Date("2026-10-20T10:00:00.000Z"),
    content: [
      "Un README es la primera impresión de tu proyecto. Antes de leer el código, cualquier persona pasa por ese archivo. Si no explica qué hace el proyecto ni cómo ejecutarlo, la mayoría cerrará la pestaña.",
      "Mi estructura favorita tiene cuatro partes: una descripción breve, los requisitos previos, los pasos de instalación y un ejemplo de uso. Todo lo demás es opcional, pero estas cuatro secciones resuelven el noventa por ciento de las dudas.",
      "Los bloques de código con comandos copiables ahorran tiempo y evitan errores. También conviene indicar la versión de Node o de la herramienta principal, porque un proyecto que funciona en una máquina puede fallar en otra.",
      "Escribir documentación parece una tarea aburrida hasta que vuelves a tu propio proyecto tres meses después. Un buen README no es para los demás: es una carta a tu yo del futuro.",
    ].join("\n\n"),
  },
];

const comments: {
  body: string;
  postIndex: number;
  author: DemoAuthor;
  createdAt: Date;
}[] = [
  {
    body: "Me identifico con lo de romper cosas: así es como realmente se aprende.",
    postIndex: 0,
    author: "ana",
    createdAt: new Date("2026-10-02T09:00:00.000Z"),
  },
  {
    body: "Muy útil el detalle de params asíncronos. Justo me estaba pasando.",
    postIndex: 1,
    author: "ana",
    createdAt: new Date("2026-10-11T15:30:00.000Z"),
  },
  {
    body: "Gracias, Ana. En la siguiente fase lo vamos a usar con la base de datos.",
    postIndex: 1,
    author: "jean",
    createdAt: new Date("2026-10-11T18:00:00.000Z"),
  },
];

async function main() {
  await prisma.session.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  const authors = {
    jean: await prisma.user.create({
      data: {
        name: "Jean",
        email: "jean@example.com",
        passwordHash: demoPasswordHash,
      },
    }),
    ana: await prisma.user.create({
      data: {
        name: "Ana",
        email: "ana@example.com",
        passwordHash: demoPasswordHash,
      },
    }),
  };

  const createdPosts = [];

  for (const post of posts) {
    const { author, ...data } = post;

    createdPosts.push(
      await prisma.post.create({
        data: { ...data, authorId: authors[author].id },
      }),
    );
  }

  for (const comment of comments) {
    const { postIndex, author, ...data } = comment;

    await prisma.comment.create({
      data: {
        ...data,
        postId: createdPosts[postIndex].id,
        authorId: authors[author].id,
      },
    });
  }

  console.log(
    "Seed listo: 2 usuarios, 4 posts y 3 comentarios. Contraseña de demo: password123",
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
