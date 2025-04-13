const express = require('express');
const cors = require('cors');
const path = require('path'); // 👈 necesario para servir archivos
require('dotenv').config(); 

const app = express();
const userRoutes = require('./routes/userRoutes');

// Middlewares
app.use(cors());
app.use(express.json());

// Servir archivo HTML (frontend) desde /public
app.use(express.static(path.join(__dirname, 'public')));

// API REST
app.use('/usuarios', userRoutes);

// Ruta de prueba (opcional)
app.get('/api', (req, res) => {
  res.send('🚀 Backend funcionando correctamente');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
