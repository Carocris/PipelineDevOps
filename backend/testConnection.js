const { poolConnect } = require('./db');

(async () => {
  try {
    await poolConnect;
    console.log('✅ Conexión exitosa a SQL Server');
  } catch (err) {
    console.error('❌ Error al conectar:', err);
  }
})();
