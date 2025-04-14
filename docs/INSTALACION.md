Guía de Instalación del Proyecto DevOps

Este documento te guiará paso a paso para ejecutar localmente el entorno de desarrollo con Docker y Node.js.

✅ Requisitos Previos

Asegúrate de tener instalado:

Git

Docker Desktop

Node.js (opcional, si deseas correr el backend sin contenedores)

📅 1. Clonar el repositorio

Abre tu terminal o PowerShell y ejecuta:

git clone https://github.com/Carocris/PipelineDevOps.git
cd PipelineDevOps

🗂️ 2. Crear el archivo .env

En la raíz del proyecto, crea un archivo llamado .env con el siguiente contenido:

DB_USER=sa
DB_PASSWORD=ccoa
DB_SERVER=db
DB_NAME=DevOpsDB
PORT=3000

❗ Asegúrate de no subir este archivo a GitHub.

🐳 3. Levantar la aplicación con Docker

Desde la raíz del proyecto, ejecuta:

docker-compose up --build

Esto construirá la imagen del backend y levantará dos servicios:

Backend (Node.js) en http://localhost:3000

Base de datos SQL Server en el puerto 3000

🔎 4. Verificar que funciona

Abre tu navegador y visita:

http://localhost:3000

Deberías ver el mensaje:

🚀 Backend funcionando correctamente

🧪 5. Probar la vista web (opcional)

Si tienes una vista HTML para gestión de usuarios, puedes abrirla en tu navegador directamente como archivo local o servirla con Live Server.

👑 6. Detener los contenedores

Cuando termines, puedes apagarlos con:

docker-compose down -v

Esto elimina también los volúmenes de datos.

¡Listo! Ahora tienes el proyecto corriendo localmente con todo el entorno DevOps configurado 🚀

