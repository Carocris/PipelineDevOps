const { poolConnect } = require('../db');

exports.obtenerUsuarios = async (req, res) => {
  try {
    const pool = await poolConnect;
    const result = await pool.request().query("SELECT * FROM Usuarios");
    res.json(result.recordset);
  } catch (error) {
    console.error("❌ Error al obtener los usuarios:", error);
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

exports.crearUsuario = async (req, res) => {
  try {
    const pool = await poolConnect;
    const { nombre, email } = req.body;

    await pool.request()
      .input("nombre", nombre)
      .input("email", email)
      .query("INSERT INTO Usuarios (nombre, email) VALUES (@nombre, @email)");

    res.status(201).send("✅ Usuario creado correctamente");
  } catch (err) {
    console.error("❌ Error al crear usuario:", err);
    res.status(500).send("Error al crear el usuario");
  }
};
