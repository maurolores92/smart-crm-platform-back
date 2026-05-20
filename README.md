# AI CRM Platform Backend

Backend de una plataforma CRM impulsada por Inteligencia Artificial, desarrollado con NestJS y PostgreSQL.

La API está enfocada en la gestión de clientes, pipelines de ventas, automatización de workflows y autenticación basada en roles (RBAC), utilizando una arquitectura escalable preparada para aplicaciones SaaS modernas.

---

## ✨ Características Principales

### 🔐 Autenticación y Seguridad
- JWT Authentication
- Roles y permisos dinámicos (RBAC)
- Protección de rutas
- Middleware y guards personalizados

### 👥 Gestión de Clientes y Leads
- CRUD de clientes
- Gestión de prospectos
- Estados y prioridades
- Seguimiento comercial

### 📋 Pipeline Kanban
- Gestión de pipelines de ventas
- Estados personalizados
- Reordenamiento dinámico
- Arquitectura multi-tenant

### 🧠 Automatización con IA
- Generación automática de seguimientos
- Creación inteligente de tareas
- Automatización de workflows
- Integración con Groq API

### ⚡ Tiempo Real
- Preparado para WebSockets
- Actualizaciones en tiempo real
- Arquitectura colaborativa

---

## 🛠️ Stack Tecnológico

- NestJS
- Node.js
- TypeScript
- PostgreSQL
- TypeORM
- JWT
- Passport.js
- RBAC
- Socket.IO
- Groq API

---

## 🚀 Estado del Proyecto

Actualmente en desarrollo.

El backend está diseñado como una arquitectura modular escalable para plataformas CRM y aplicaciones SaaS multiusuario.

---

## 📌 Módulos Planeados

- Authentication
- Users & Roles
- Leads Management
- Kanban Pipelines
- Tasks
- AI Workflows
- Notifications
- Activity Logs
- WebSockets

---

## ⚙️ Variables de entorno

```env
PORT=5002

DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=password
DATABASE_NAME=crm_db

JWT_SECRET=your_jwt_secret

GROQ_API_KEY=your_groq_api_key
```

---

## ▶️ Ejecutar el proyecto

```bash
npm install
npm run start:dev
```

---

## 🧠 Arquitectura Backend

El proyecto sigue una arquitectura modular basada en NestJS:

- Separación por módulos
- Sistema RBAC desacoplado
- Arquitectura multi-tenant
- API REST escalable
- Integración con IA
- Preparado para tiempo real

---

## 👨‍💻 Autor

Desarrollado por Mauricio Lores

---

## 📄 Licencia

MIT License