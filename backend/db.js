require('dotenv').config({ path: process.env.CI ? './.env.ci' : '../.env' });

const sql = require("mssql");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER || 'localhost',
  database: process.env.DB_NAME,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

let pool; // conexión global compartida

async function initDatabase(retries = 5) {
  try {
    // 1. Conexión a la base de datos 'master' para crear la principal si no existe
    const masterPool = await sql.connect({ ...config, database: 'master' });
    await masterPool.request().query(`
      IF DB_ID(N'${process.env.DB_NAME}') IS NULL
        CREATE DATABASE [${process.env.DB_NAME}];
    `);
    await masterPool.close();
    console.log("✅ Base de datos verificada o creada");

    // 2. Conectar a la base de datos real
    pool = await sql.connect(config);

    // 3. Verificar y crear la tabla Usuarios
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

  } catch (err) {
    if (retries > 0) {
      console.log(`⏳ Reintentando conexión... (${retries} restantes)`);
      await new Promise((resolve) => setTimeout(resolve, 5000));
      return initDatabase(retries - 1);
    } else {
      console.error("❌ Error crítico al inicializar la base de datos:", err.message);
      process.exit(1);
    }
  }
}

function getPool() {
  if (!pool) {
    throw new Error("❌ Conexión no inicializada. Llama a initDatabase() antes de usar getPool().");
  }
  return pool;
}

module.exports = {
  initDatabase,
  getPool,
};
