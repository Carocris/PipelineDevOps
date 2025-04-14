const express = require('express');
const router = express.Router();
const { getPool } = require('../db');

// GET: Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const pool = getPool();
    const result = await pool.request().query('SELECT * FROM Usuarios');
    res.json(result.recordset);
  } catch (error) {
    console.error('❌ Error al obtener usuarios:', error);
    res.status(500).json({ mensaje: 'Error al obtener usuarios' });
  }
});

// POST: Crear nuevo usuario
router.post('/', async (req, res) => {
  const { nombre, email } = req.body;

  if (!nombre || !email) {
    return res.status(400).json({ mensaje: 'Nombre y email son requeridos' });
  }

  try {
    const pool = getPool();
    const result = await pool.request()
      .input('nombre', nombre)
      .input('email', email)
      .query('INSERT INTO Usuarios (nombre, email) OUTPUT INSERTED.* VALUES (@nombre, @email)');

    res.status(201).json(result.recordset[0]);
  } catch (error) {
    console.error('❌ Error al agregar usuario:', error);
    res.status(500).json({ mensaje: 'Error al agregar usuario' });
  }
});

// DELETE: Eliminar usuario por ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const pool = getPool();
    const result = await pool.request()
      .input('id', id)
      .query('DELETE FROM Usuarios WHERE id = @id');

    if (result.rowsAffected[0] > 0) {
      res.json({ mensaje: '✅ Usuario eliminado correctamente' });
    } else {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('❌ Error al eliminar usuario:', error);
    res.status(500).json({ mensaje: 'Error al eliminar usuario' });
  }
});

module.exports = router;
