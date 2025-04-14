const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: process.env.CI ? './.env.ci' : '../.env' });

const app = express();
const userRoutes = require('./routes/userRoutes');

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
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  });
}

module.exports = app; // Exportar para pruebas con Jest
