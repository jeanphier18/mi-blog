# Mi Blog

**Sitio publicado:** https://mi-blog-flax.vercel.app

Blog personal construido paso a paso con Next.js 16, TypeScript, Tailwind CSS, Prisma y PostgreSQL (Neon).

Incluye lista de artículos, página de detalle, publicación de artículos y autenticación con sesiones en base de datos.

## Requisitos

- Node.js 20.9 o superior
- npm
- Una base de datos PostgreSQL (se recomienda [Neon](https://neon.tech), plan gratuito)

## Puesta en marcha

```bash
# 1. Instalar dependencias (también genera el cliente de Prisma)
npm install

# 2. Configurar la base de datos con Neon (solo la primera vez)
npm install -g neon
neon login
neon init

# 3. Trabajar contra la rama de desarrollo y traer sus variables
neon checkout dev
neon env pull

# 4. Aplicar las migraciones
npm run db:migrate

# 5. Cargar datos de ejemplo (solo en desarrollo)
npm run db:seed

# 6. Arrancar el servidor de desarrollo
npm run dev
```

Abre http://localhost:3000 en el navegador.

> `neon init` genera `.env` con `DATABASE_URL` (con pooling, para la aplicación) y `DATABASE_URL_UNPOOLED` (conexión directa, para migraciones y seed). También crea `neon.ts` con la política de ramas: cada rama nueva caduca a los 7 días.

## Usuarios de demo

Después de ejecutar `npm run db:seed` en desarrollo existen estas cuentas:

| Correo             | Contraseña    |
| ------------------ | ------------- |
| jean@example.com   | password123   |
| ana@example.com    | password123   |

También puedes crear una cuenta desde `/register` sin cargar el seed.

> No ejecutes `npm run db:seed` contra la base de datos de producción: crea usuarios de demostración con contraseña conocida. La rama `production` debe quedar vacía.

## Scripts

| Comando              | Descripción                                       |
| -------------------- | ------------------------------------------------- |
| `npm run dev`        | Inicia el servidor de desarrollo                  |
| `npm run build`      | Compila la aplicación para producción             |
| `npm run start`      | Sirve la compilación de producción                |
| `npm run lint`       | Ejecuta ESLint                                    |
| `npm run db:migrate` | Crea y aplica migraciones en desarrollo           |
| `npm run db:deploy`  | Aplica migraciones pendientes (producción)        |
| `npm run db:seed`    | Carga los datos de ejemplo                        |
| `npm run db:studio`  | Abre Prisma Studio para explorar la base de datos |
| `npm run db:generate`| Regenera el cliente de Prisma                     |

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
  prisma.ts             Cliente de Prisma con adaptador pg (singleton)
prisma/
  schema.prisma         Modelos User, Post, Comment y Session
  seed.ts               Datos de ejemplo
  migrations/           Migraciones de PostgreSQL
neon.ts                 Configuración de Neon (política de ramas)
```

## Cómo funciona la autenticación

- La contraseña se guarda con hash de bcrypt.
- Al iniciar sesión se crea una sesión en la base de datos y se envía una cookie `httpOnly`.
- En la base de datos solo se guarda el hash SHA-256 del token de sesión.
- Las rutas de publicación comprueban la sesión en el servidor.
- En producción la cookie se marca como `secure` y viaja solo por HTTPS.

## Despliegue en Vercel

1. Sube el proyecto a GitHub.
2. En [Vercel](https://vercel.com), importa el repositorio como nuevo proyecto.
3. Configura las variables de entorno del proyecto en Vercel:
   - **Production:** `DATABASE_URL` y `DATABASE_URL_UNPOOLED` de la rama `production`.
   - **Preview:** las cadenas de la rama `dev` (o de la rama que uses para previsualizaciones).
4. Aplica el esquema a producción sin cargar datos de ejemplo:
   ```bash
   neon checkout production
   neon env pull
   npm run db:deploy
   neon checkout dev
   neon env pull
   ```
5. Despliega. Vercel publicará cada push a `main` de forma automática.

No ejecutes `npm run db:seed` en producción: la base de datos pública debe quedar vacía y el primer usuario se registra desde `/register`.
