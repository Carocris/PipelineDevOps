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

let pool; // variable global para la conexión

async function initDatabase(retries = 5) {
  try {
    // Conectar al master para crear la DB si no existe
    const masterPool = await sql.connect({ ...config, database: 'master' });
    await masterPool.request().query(`
      IF DB_ID(N'${process.env.DB_NAME}') IS NULL
        CREATE DATABASE [${process.env.DB_NAME}];
    `);
    await masterPool.close();
    console.log("✅ Base de datos verificada o creada");

    // Conectarse a la base de datos
    pool = await sql.connect(config);

    // Crear tabla Usuarios si no existe
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

// Exportar la función de inicialización y el pool una vez listo
module.exports = {
  initDatabase,
  getPool: () => pool,
};
