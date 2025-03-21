# Aplicación de Registro de Pacientes

## Objetivo
Esta aplicación permite el registro de pacientes a través de una API REST construida con **Node.js** y **Express**, con almacenamiento en **PostgreSQL** y gestión de datos a través de **Prisma ORM**. La aplicación está contenida en **Docker** para asegurar un entorno de desarrollo reproducible.

## Tecnologías utilizadas
- **Backend:** Node.js + Express
- **Base de datos:** PostgreSQL
- **ORM:** Prisma
- **Desarrollo en contenedores:** Docker + Docker Compose
- **Gestor de dependencias:** npm
- **Envió de correos:** Mailtrap (en futuras iteraciones)
- **Manejo de variables de entorno:** dotenv

## 📂 Estructura del Proyecto
```
backend/
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── prisma/
│   ├── app.js
│   ├── server.js
├── .env
├── .gitignore
├── package.json
├── prisma/schema.prisma
├── Dockerfile
├── README.md
```

## 🛠️ Instalación y Configuración
### 1️⃣ Clonar el repositorio
```sh
git clone <URL_DEL_REPOSITORIO>
cd backend
```

### 2️⃣ Configurar variables de entorno
Crea un archivo `.env` en la carpeta `backend/` con el siguiente contenido:
```ini
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/nombre_basedatos"
PORT=5000
```

### 3️⃣ Instalar dependencias
```sh
npm install
```

### 4️⃣ Ejecutar migraciones de Prisma
```sh
npx prisma migrate dev --name init
```

### 5️⃣ Iniciar el servidor
```sh
npm run dev
```

## 🐳 Uso con Docker
### 1️⃣ Construir y levantar los contenedores
```sh
docker-compose up -d
```
Esto levantará:
- Un contenedor con el backend en Node.js.
- Un contenedor con PostgreSQL.

### 2️⃣ Verificar logs


### 3️⃣ Apagar los contenedores
```sh
docker-compose down
```

## 📡 API Endpoints

### 🔹 Registrar un paciente
**POST** `/api/patients`
#### Request body (JSON)
```json
{
  "fullName": "Juan Pérez",
  "email": "juan.perez@gmail.com",
  "phone": "+59812345678",
  "photoUrl": "http://example.com/photo.jpg"
}
```
#### Respuesta esperada
```json
{
  "id": "uuid",
  "fullName": "Juan Pérez",
  "email": "juan.perez@gmail.com",
  "phone": "+59812345678",
  "photoUrl": "http://example.com/photo.jpg",
  "createdAt": "2025-03-20T12:00:00Z"
}
```

### 🔹 Obtener todos los pacientes
**GET** `/api/patients`
#### Respuesta esperada
```json
[
  {
    "id": "uuid",
    "fullName": "Juan Pérez",
    "email": "juan.perez@gmail.com",
    "phone": "+59812345678",
    "photoUrl": "http://example.com/photo.jpg",
    "createdAt": "2025-03-20T12:00:00Z"
  }
]
```

## Preguntas Frecuentes (FAQ)

### ❓ ¿Puedo usar otra base de datos?
Actualmente, el backend está diseñado para **PostgreSQL**, pero podrías modificar la configuración de Prisma para usar MySQL o SQLite.

### ❓ ¿Es necesario Docker para ejecutar el backend?
No, puedes correrlo localmente sin Docker siguiendo los pasos de la sección **"Instalación y Configuración"**.

### ❓ ¿Cómo puedo contribuir o reportar problemas?
Si encuentras un bug o quieres contribuir, abre un **issue** o crea un **pull request** en el repositorio.

---


