import request from 'supertest';
import { app } from '../../app';

describe('Admin routes', () => {
  describe('GET /admin', () => {
    it('should return a 200 status code', async () => {
      const response = await request(app).get('/admin');
      expect(response.status).toBe(200);
    });
  });

  describe('POST /admin', () => {
    it('should return a 201 status code', async () => {
      const response = await request(app).post('/admin').send({
        username: 'admin',
        password: 'password',
      });
      expect(response.status).toBe(201);
    });
  });
});