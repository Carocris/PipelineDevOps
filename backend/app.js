const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: process.env.CI ? './.env.ci' : '../.env' });

const { initDatabase } = require('./db');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Servir frontend estático si lo tienes en /public
app.use(express.static(path.join(__dirname, 'public')));

// Rutas API
app.use('/usuarios', userRoutes);

// Ruta de prueba
app.get('/api', (req, res) => {
  res.send('🚀 Backend funcionando correctamente');
});

// 👉 Solo iniciar servidor si NO está siendo importado (como en los tests)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  initDatabase().then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
    });
  }).catch((err) => {
    console.error("❌ No se pudo iniciar el servidor:", err.message);
    process.exit(1);
  });
}

module.exports = app; // Exportar para pruebas con Jest
