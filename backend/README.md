# 🏥 Backend - Registro de Pacientes

Este backend fue desarrollado como parte de una prueba técnica. Su objetivo principal es proveer una API REST que permita registrar pacientes y almacenar su información en una base de datos PostgreSQL, cumpliendo con las validaciones necesarias y el envío de correos de confirmación.

## Objetivo
Desarrollar una API para gestionar el registro de pacientes de forma segura, validando los datos ingresados y almacenándolos de forma persistente.


## Funcionalidades requeridas

- ✅ Registro de pacientes con los siguientes datos:
  - Nombre completo
  - Correo electrónico
  - Número de teléfono
  - Foto del documento de identidad (URL o path local)

- ✅ Validación de datos:
  - Todos los campos obligatorios deben ser válidos.
  - El correo electrónico debe ser único.

- ✅ Almacenamiento:
  - Los datos deben guardarse en una base de datos PostgreSQL.

- ✅ Confirmación por correo:
  - Se debe enviar un email de confirmación **de forma asíncrona** después del registro exitoso.
  - No es necesario diseñar el correo (puede usarse una plantilla por defecto).

- ✅ Docker:
  - Toda la aplicación debe correr en un entorno de desarrollo usando Docker.

## 🛠 Tecnologías utilizadas
- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- Docker / Docker Compose
- Mailtrap (para pruebas de correo)


# Instrucciones para correr el back

## 🛠️ Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/registro-pacientes.git
cd backend
```

2. Instalar dependencias y correr el servidor
```bash
npm install

npm run dev
```

