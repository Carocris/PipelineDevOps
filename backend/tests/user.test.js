const request = require('supertest');
const app = require('../app'); // Asegúrate que `app` se exporte

describe("GET /usuarios", () => {
  it("debería responder con status 200", async () => {
    const res = await request(app).get("/usuarios");
    expect(res.statusCode).toBe(200);
  });
});
