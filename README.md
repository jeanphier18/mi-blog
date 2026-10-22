# Mi Blog

Blog personal construido paso a paso con Next.js 16, TypeScript, Tailwind CSS, Prisma y SQLite.

Incluye lista de artículos, página de detalle, publicación de artículos y autenticación con sesiones en base de datos.

## Requisitos

- Node.js 20 o superior
- npm

## Puesta en marcha

```bash
# 1. Instalar dependencias (también genera el cliente de Prisma)
npm install

# 2. Crear el archivo .env con la cadena de conexión
#    DATABASE_URL="file:./prisma/dev.db"

# 3. Aplicar las migraciones
npm run db:migrate

# 4. Cargar datos de ejemplo
npm run db:seed

# 5. Arrancar el servidor de desarrollo
npm run dev
```

Abre http://localhost:3000 en el navegador.

## Usuarios de demo

| Correo             | Contraseña    |
| ------------------ | ------------- |
| jean@example.com   | password123   |
| ana@example.com    | password123   |

También puedes crear una cuenta desde `/register`.

## Scripts

| Comando            | Descripción                                      |
| ------------------ | ------------------------------------------------ |
| `npm run dev`      | Inicia el servidor de desarrollo                 |
| `npm run build`    | Compila la aplicación para producción            |
| `npm run start`    | Sirve la compilación de producción               |
| `npm run lint`     | Ejecuta ESLint                                   |
| `npm run db:migrate` | Crea y aplica migraciones                      |
| `npm run db:seed`  | Carga los datos de ejemplo                       |
| `npm run db:studio`| Abre Prisma Studio para explorar la base de datos |
| `npm run db:generate` | Regenera el cliente de Prisma                 |

## Estructura

```text
app/
  page.tsx              Lista de artículos
  posts/[id]/page.tsx   Detalle de un artículo
  posts/new/            Formulario para publicar (requiere sesión)
  login/ register/      Autenticación
  auth/actions.ts       Server Actions de sesión
components/             Header, PostCard y AuthForm
lib/
  auth.ts               Sesiones con cookie + bcrypt
  posts.ts              Consultas cacheadas con etiquetas
  prisma.ts             Cliente de Prisma (singleton)
prisma/
  schema.prisma         Modelos User, Post, Comment y Session
  seed.ts               Datos de ejemplo
```

## Cómo funciona la autenticación

- La contraseña se guarda con hash de bcrypt.
- Al iniciar sesión se crea una sesión en la base de datos y se envía una cookie `httpOnly`.
- En la base de datos solo se guarda el hash SHA-256 del token de sesión.
- Las rutas de publicación comprueban la sesión en el servidor.

## Despliegue

SQLite guarda los datos en un archivo local, así que no funciona en plataformas serverless como Vercel sin cambios. Para desplegar:

1. Migra la base de datos a PostgreSQL o Turso.
2. Cambia el adaptador de Prisma y la variable `DATABASE_URL`.
3. Ejecuta `npm run build` y despliega en tu plataforma preferida.
