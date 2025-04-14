Documentación del Pipeline CI/CD

Este documento describe la configuración del pipeline de Integración Continua (CI) y Despliegue Continuo (CD) del proyecto PipelineDevOps.

⚙️ Tecnología Utilizada

GitHub Actions: Automatización del pipeline.

Docker: Contenedorización de backend y base de datos.

SQL Server 2022: Motor de base de datos relacional.

Node.js + Express: Backend de la aplicación.

🔁 Flujo del Pipeline

Evento de disparo:

Cada push o pull request en la rama main.

Etapas:

Checkout del código

Se clona el repositorio usando actions/checkout@v3.

Arranque de servicios

Se levanta un contenedor con SQL Server (mcr.microsoft.com/mssql/server:2022-latest) como servicio adicional de GitHub Actions.

Instalación de dependencias

Se ejecuta npm install dentro del directorio backend/ para instalar las dependencias del proyecto.

Ejecución de pruebas (si existieran)

Se ejecuta npm test si está definido en package.json. En caso contrario, se notifica en consola.

Confirmación del pipeline

Mensaje de éxito al finalizar el proceso.

🧪 Tests

Actualmente el proyecto no incluye pruebas automatizadas. Sin embargo, el pipeline ya está preparado para integrarlas cuando se desarrollen.

📁 Ubicación del pipeline

El archivo se encuentra en:

.github/workflows/ci.yml

📝 Recomendaciones futuras

Agregar pruebas unitarias con Jest o Mocha.

Añadir etapa de despliegue a un servidor o servicio cloud.

Notificaciones en Slack/Discord/Telegram ante fallos.

✅ Resultado esperado

En una ejecución exitosa, se debería ver en GitHub:

Cada paso marcado como ✓ Success.

Logs visibles con los pasos realizados y los resultados.

Este pipeline asegura calidad y consistencia en el proceso de integración de cambios en el backend del proyecto.

