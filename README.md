# Edificios ERP | Frontend

Aplicación web para administrar edificios y condominios desde una sola plataforma. El frontend ofrece vistas diferenciadas para administradores, conserjes, residentes y personal de aseo, y se comunica con una API Laravel.

> Proyecto personal con propósito educativo y de portafolio. Su arquitectura está pensada para evolucionar hacia una solución comercial, incorporando gradualmente procesos reales de operación, seguridad y finanzas.

**Frontend:** React + TypeScript + Vite  
**Backend:** [edificios-api](https://github.com/melek-eyzaguirre-dev/edificios-api)  
**Demo:** próximamente

## Qué problema resuelve

Los edificios suelen administrar visitas, reservas, personal, gastos y novedades en herramientas separadas. Este proyecto busca centralizar esa operación y mostrar información relevante según el rol de cada usuario.

## Funcionalidades actuales

- Inicio de sesión y registro de residentes.
- Control de acceso por rol: administrador, conserje, residente y personal de aseo.
- Dashboard con resumen operativo.
- Visitas, novedades y estacionamientos.
- Reservas de espacios comunes.
- Personal, turnos, asistencias y solicitudes de ausencia.
- Gastos comunes, proveedores e inventario.
- Arquitectura preparada para agregar nuevos módulos sin mezclar la lógica.

Algunas pantallas siguen en desarrollo y pueden utilizar datos de ejemplo. El estado de cada módulo se irá actualizando a medida que se conecte completamente con la API.

## Tecnologías

- React 18, TypeScript y Vite
- React Router
- TanStack React Query y Axios
- Zustand
- Tailwind CSS
- React Hook Form, Zod y Recharts

## Arquitectura

El código está organizado por funcionalidad de negocio:

```text
src/
  features/       # módulos: visitas, reservas, personal, gastos, etc.
  layouts/        # experiencias para cada tipo de usuario
  routes/         # rutas protegidas y permisos
  store/          # sesión y condominio activo
  lib/            # cliente HTTP, React Query y utilidades
  components/ui/  # componentes reutilizables
```

Cada módulo puede tener `api`, `hooks`, `components` y `types`. Los componentes no llaman directamente a Axios: las solicitudes pasan por la capa API y por hooks de React Query.

## Instalación local

Requisitos: Node.js 18 o superior, npm y el backend Laravel disponible.

Las dependencias se instalan una sola vez, no cada vez que inicias una sesión.

```bash
npm install
```

En Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

En macOS o Linux:

```bash
cp .env.example .env
```

Configura la URL de la API en `.env` cuando uses `php artisan serve`:

```env
VITE_API_URL=http://localhost:8000/api
```

Inicia el proyecto:

```bash
npm run dev
```

Abre `http://localhost:5173`.

## Inicio diario

Primero inicia el backend en una terminal y déjalo abierto. Luego abre otra
terminal para el frontend:

```powershell
cd F:\laragon\www\edificios-frontend\edificios-frontend
npm run dev
```

Visita `http://localhost:5173`. Solo vuelve a ejecutar `npm install` si borraste
`node_modules`, cambió `package-lock.json` o acabas de clonar el proyecto.

## Comandos

```bash
npm run dev       # servidor de desarrollo
npm run build     # compilación de producción
npm run preview   # vista previa de la compilación
npm run lint      # revisión de ESLint
```

La compilación está verificada con `npm run build`. El lint requiere completar la configuración compatible con ESLint 9 mediante `eslint.config.js`.

## Backend y CORS

El backend es un repositorio independiente. Para trabajar localmente:

1. Inicia la API Laravel en `http://edificios-api.test` o en la URL que uses.
2. Configura `VITE_API_URL` en este proyecto.
3. Permite `http://localhost:5173` en CORS del backend.
4. Mantén los secretos únicamente en `.env`; ese archivo no se publica.

## Roadmap

- Completar formularios de creación y edición.
- Añadir pruebas unitarias y de integración.
- Incorporar notificaciones y auditoría de acciones.
- Registrar visitas mediante QR y validar autorizaciones en portería.
- Mejorar gastos comunes con estados de pago y reportes exportables.
- Preparar despliegue con datos de demostración y roles reproducibles.

## Repositorios relacionados

- [Frontend](https://github.com/melek-eyzaguirre-dev/edificios-erp)
- [Backend API](https://github.com/melek-eyzaguirre-dev/edificios-api)

## Licencia

Este proyecto se publica como material de aprendizaje y portafolio. La licencia comercial y las condiciones de uso se definirán antes de ofrecerlo a terceros.
