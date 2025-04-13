const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    await pool.connect();
    const result = await pool.request().query('SELECT * FROM Usuarios');
    res.json(result.recordset);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ mensaje: 'Error al obtener usuarios' });
  }
});

router.post('/', async (req, res) => {
  const { nombre, email } = req.body;

  if (!nombre || !email) {
    return res.status(400).json({ mensaje: 'Nombre y email son requeridos' });
  }

  try {
    await pool.connect();
    const result = await pool.request()
      .input('nombre', nombre)
      .input('email', email)
      .query('INSERT INTO Usuarios (nombre, email) OUTPUT INSERTED.* VALUES (@nombre, @email)');
    
    res.status(201).json(result.recordset[0]);
  } catch (error) {
    console.error('Error al agregar usuario:', error);
    res.status(500).json({ mensaje: 'Error al agregar usuario' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.connect();
    const result = await pool.request()
      .input('id', id)
      .query('DELETE FROM Usuarios WHERE id = @id');

    if (result.rowsAffected[0] > 0) {
      res.json({ mensaje: 'Usuario eliminado correctamente' });
    } else {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ mensaje: 'Error al eliminar usuario' });
  }
});

module.exports = router;
