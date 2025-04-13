const sql = require("mssql");
require("dotenv").config(); // 👈 Importar variables desde .env

const config = {
  user: process.env.DB_USER || "sa",
  password: process.env.DB_PASSWORD || "ccoa",
  server: process.env.DB_SERVER || "host.docker.internal", // Para Docker
  database: process.env.DB_NAME || "DevOpsDB",
  options: {
    encrypt: false, // 👈 muy importante para local
    trustServerCertificate: true
  }
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

// Crear tabla si no existe
poolConnect.then(async () => {
  const request = pool.request();
  await request.query(`
    IF NOT EXISTS (
      SELECT * FROM sys.tables WHERE name = 'Usuarios'
    )
    CREATE TABLE Usuarios (
      id INT PRIMARY KEY IDENTITY(1,1),
      nombre NVARCHAR(100) NOT NULL,
      email NVARCHAR(100) NOT NULL
    );
  `);
  console.log("✅ Tabla Usuarios verificada o creada correctamente");
}).catch(err => {
  console.error("❌ Error al conectar a la base de datos:", err);
});

module.exports = pool;
