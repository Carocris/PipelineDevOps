Manual de Operaciones - PipelineDevOps

Este documento tiene como objetivo proporcionar las instrucciones esenciales para ejecutar, mantener y monitorear el sistema PipelineDevOps.

🟢 Puesta en marcha del entorno local

1. Requisitos previos

Docker y Docker Compose instalados.

Node.js v18 o superior (si se desea correr sin contenedor).

2. Clonar el repositorio

git clone https://github.com/Carocris/PipelineDevOps.git
cd PipelineDevOps

3. Crear archivo .env

Dentro de backend/, crea un archivo .env con el siguiente contenido:

DB_USER=sa
DB_PASSWORD=ccoa1234!
DB_SERVER=db
DB_NAME=DevOpsDB
PORT=3000

4. Levantar los servicios

docker-compose up --build

Esto construirá y levantará el backend y SQL Server.

🧪 Verificación del sistema

Verificar conexión

Accede a http://localhost:3000 para confirmar que el backend está corriendo.

Probar funcionalidad básica

Visita la vista HTML del frontend (si está integrada).

Verifica que puedas agregar, listar o eliminar usuarios.

📦 Estructura de carpetas relevante

PipelineDevOps/
├── backend/                # Código del servidor Node.js
│   ├── app.js             # Archivo principal
│   ├── routes/            # Rutas de la API
│   ├── controllers/       # Lógica de negocio
│   ├── database.js        # Conexión SQL Server
│   └── .env               # Variables de entorno
├── docker/                # Dockerfile y recursos del backend
├── docker-compose.yml     # Orquestación de servicios
└── .github/workflows/ci.yml # CI pipeline de GitHub Actions

🛠️ Mantenimiento

Reiniciar servicios

docker-compose down -v

docker-compose up --build

Logs de contenedores

docker logs devops_backend

docker logs devops_sqlserver

🚨 Solución de problemas

Error: "Error al obtener usuarios"

Verifica que la tabla Usuarios exista.

Confirma que las variables de entorno están correctamente cargadas.

Error de conexión a SQL Server

Asegúrate de que DB_PASSWORD cumple con los requisitos de seguridad (mínimo 8 caracteres).

📤 Despliegue (futuro)

Se recomienda añadir soporte para despliegue automático a un entorno cloud o servidor propio mediante GitHub Actions.

