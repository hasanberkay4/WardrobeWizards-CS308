import request from 'supertest';
import { app } from '../../app';
import { adminRouter } from '../../routes/adminRouter';

// import your controller functions
import adminController from '../../controller/adminController';

// describe the test suite
describe('Admin Router', () => {
  // test the admin sign in controller
  describe('POST /login', () => {
    it('should return a 200 status code and a token', async () => {
      const response = await request(app)
        .post('/admin/login')
        .send({ email: 'admin@example.com', password: 'password' });
      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined();
    });
  });

  // test the admin sign up controller
  describe('POST /register', () => {
    it('should return a 201 status code and a token', async () => {
      const response = await request(app)
        .post('/admin/register')
        .send({ email: 'admin@example.com', password: 'password' });
      expect(response.status).toBe(201);
      expect(response.body.token).toBeDefined();
    });
  });

  // test the admin get products controller
  describe('GET /products', () => {
    it('should return a 200 status code and an array of products', async () => {
      const response = await request(app).get('/admin/products');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  // test the admin get product controller
  describe('GET /products/:id', () => {
    it('should return a 200 status code and a product object', async () => {
      const response = await request(app).get('/admin/products/1');
      expect(response.status).toBe(200);
      expect(typeof response.body).toBe('object');
    });
  });

  // test the admin create product controller
  describe('POST /products', () => {
    it('should return a 201 status code and a product object', async () => {
      const response = await request(app)
        .post('/admin/products')
        .send({ name: 'Product', price: 10.99 });
      expect(response.status).toBe(201);
      expect(typeof response.body).toBe('object');
    });
  });

  // test the admin update product controller
  describe('PUT /products/:id', () => {
    it('should return a 200 status code and a product object', async () => {
      const response = await request(app)
        .put('/admin/products/1')
        .send({ name: 'Updated Product', price: 9.99 });
      expect(response.status).toBe(200);
      expect(typeof response.body).toBe('object');
    });
  });

  // test the admin delete product controller
  describe('DELETE /products/:id', () => {
    it('should return a 204 status code', async () => {
      const response = await request(app).delete('/admin/products/1');
      expect(response.status).toBe(204);
    });
  });

  // test the admin update product price controller
  describe('PUT /sales-manager/products/:id', () => {
    it('should return a 200 status code and a product object', async () => {
      const response = await request(app)
        .put('/admin/sales-manager/products/1')
        .send({ price: 8.99 });
      expect(response.status).toBe(200);
      expect(typeof response.body).toBe('object');
    });
  });

  // test the admin update product discount controller
  describe('PUT /sales-manager/products/:id/discount', () => {
    it('should return a 200 status code and a product object', async () => {
      const response = await request(app)
        .put('/admin/sales-manager/products/1/discount')
        .send({ discount: 0.1 });
      expect(response.status).toBe(200);
      expect(typeof response.body).toBe('object');
    });
  });

  // test the admin get deliveries controller
  describe('GET /deliveries', () => {
    it('should return a 200 status code and an array of deliveries', async () => {
      const response = await request(app).get('/admin/deliveries');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  // test the admin get delivery controller
  describe('GET /deliveries/:id', () => {
    it('should return a 200 status code and a delivery object', async () => {
      const response = await request(app).get('/admin/deliveries/1');
      expect(response.status).toBe(200);
      expect(typeof response.body).toBe('object');
    });
  });

  // test the admin get delivery by user id controller
  describe('GET /deliveries/user_id', () => {
    it('should return a 200 status code and an array of deliveries', async () => {
      const response = await request(app).get('/admin/deliveries/user_id?user_id=1');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  // test the admin update delivery controller
  describe('PUT /deliveries/:id', () => {
    it('should return a 200 status code and a delivery object', async () => {
      const response = await request(app)
        .put('/admin/deliveries/1')
        .send({ status: 'delivered' });
      expect(response.status).toBe(200);
      expect(typeof response.body).toBe('object');
    });
  });

  // test the admin get comments controller
  describe('GET /comments', () => {
    it('should return a 200 status code and an array of comments', async () => {
      const response = await request(app).get('/admin/comments');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  // test the admin get comment controller
  describe('GET /comments/:id', () => {
    it('should return a 200 status code and a comment object', async () => {
      const response = await request(app).get('/admin/comments/1');
      expect(response.status).toBe(200);
      expect(typeof response.body).toBe('object');
    });
  });

  // test the admin update comment controller
  describe('PUT /comments/:id', () => {
    it('should return a 200 status code and a comment object', async () => {
      const response = await request(app)
        .put('/admin/comments/1')
        .send({ content: 'Updated comment' });
      expect(response.status).toBe(200);
      expect(typeof response.body).toBe('object');
    });
  });
});