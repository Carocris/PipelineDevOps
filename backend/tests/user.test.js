const request = require('supertest');
const { initDatabase } = require('../db');

let app;

beforeAll(async () => {
  // Inicializa la base de datos y asegura que la tabla Usuarios exista
  await initDatabase();

  // Importa la app después de que la conexión esté lista
  app = require('../app');
});

describe("GET /usuarios", () => {
  it("debería responder con status 200", async () => {
    const res = await request(app).get("/usuarios");
    expect(res.statusCode).toBe(200);
  });
});
