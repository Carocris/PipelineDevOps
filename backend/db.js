const sql = require("mssql");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

// Conexión al master para crear DB si no existe
const masterConfig = { ...config, database: "master" };

async function ensureDatabaseExists(retries = 5) {
  try {
    const pool = await sql.connect(masterConfig);
    await pool.request().query(`
      IF DB_ID(N'${process.env.DB_NAME}') IS NULL
        CREATE DATABASE [${process.env.DB_NAME}];
    `);
    await pool.close();
    console.log("✅ Base de datos verificada o creada");
  } catch (err) {
    console.log(`⏳ Esperando conexión... reintentos restantes: ${retries}`);
    if (retries > 0) {
      setTimeout(() => ensureDatabaseExists(retries - 1), 5000);
    } else {
      console.error("❌ No se pudo conectar a SQL Server:", err);
      process.exit(1);
    }
  }
}

const pool = new sql.ConnectionPool(config);
const poolConnect = ensureDatabaseExists().then(() => pool.connect());

poolConnect.then(async (pool) => {
  try {
    await pool.request().query(`
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
  } catch (error) {
    console.error("❌ Error creando la tabla:", error);
    process.exit(1);
  }
}).catch((err) => {
  console.error("❌ Error conectando a la base de datos:", err);
  process.exit(1);
});

module.exports = { pool, poolConnect };
