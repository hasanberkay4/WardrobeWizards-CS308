import request from 'supertest';
import { imagesRouter } from '../routes/imagesRouter';

describe('imagesRouter', () => {
  it('should respond with status code 200 when getting all images', async () => {
    const response = await request(imagesRouter).get('/');
    expect(response.status).toBe(200);
  });

  it('should respond with status code 200 when getting a specific image by id', async () => {
    const response = await request(imagesRouter).get('/1');
    expect(response.status).toBe(200);
  });
});
