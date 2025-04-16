# 🚀 Proyecto DevOps - Pipeline de Backend

Este proyecto forma parte de una práctica de DevOps en la que se desarrolla un backend básico con Node.js y Express, utilizando SQL Server como base de datos, todo orquestado con Docker y GitHub Actions como CI/CD.

---

👥 Integrantes del equipo

Carolin Cristal Ortiz Alcántara – 2023-1333

Sander Rafael Fernández Tolentino – 2023-1001

Bily Manuel Álvarez Sánchez – 2023-0952


## 📚 Tecnologías utilizadas

- **Node.js** - entorno de ejecución JavaScript
- **Express** - framework para construir la API
- **MSSQL** - base de datos relacional
- **Docker** - contenedores para backend y base de datos
- **GitHub Actions** - integración continua y verificación automática del backend
- **JavaScript** - lenguaje base del backend

---

## 📁 Estructura del proyecto

```
PipelineDevOps/
├── backend/
│   ├── app.js
│   ├── controllers/
│   ├── db.js
│   ├── routes/
│   └── package.json
├── docker/
│   └── Dockerfile
├── .github/workflows/
│   └── ci.yml
├── docker-compose.yml
├── .env (no se sube al repo)
├── README.md
└── docs/
    ├── INSTALACION.md
    ├── MANUAL_OPERACIONES.md
    └── PIPELINE.md
```

---

## 🛠️ Levantar el entorno local con Docker

1. Clona el repositorio:
```bash
git clone https://github.com/Carocris/PipelineDevOps.git
```

2. Crea un archivo `.env` en la raíz del proyecto:
```env
DB_USER=sa
DB_PASSWORD=ccoa1234!
DB_SERVER=db
DB_NAME=DevOpsDB
```

3. Levanta los servicios:
```bash
docker-compose up --build
```

4. Accede al backend:
[http://localhost:3000](http://localhost:3000)

---

## 🔄 Endpoints disponibles

| Método | Ruta            | Descripción               |
|--------|------------------|---------------------------|
| GET    | /usuarios        | Obtener todos los usuarios |
| POST   | /usuarios        | Crear un nuevo usuario     |

---

## ✅ Estado del pipeline

![CI](https://github.com/Carocris/PipelineDevOps/actions/workflows/ci.yml/badge.svg)

Este proyecto ejecuta un pipeline automatizado en cada push a la rama `main`, verificando la instalación y posible ejecución de pruebas en el backend.

---

 ✨  ✨

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.



