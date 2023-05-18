import { Request, Response } from 'express';
import productController from '../controller/productController';

describe('getProductsById', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = {} as Request;
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;
  });

  it('should return a product by id', async () => {
    const mockProduct = { _id: '1', name: 'Product 1', price: 10 };
    req.params = { productid: '1' };

    jest.spyOn(productController, 'getProductsById').mockResolvedValueOnce(mockProduct);

    await productController.getProductsById(req, res);

    expect(res.json).toHaveBeenCalledWith(mockProduct);
    expect(res.status).not.toHaveBeenCalled();
  });

  it('should handle errors when retrieving a product', async () => {
    req.params = { productid: 'invalid-id' };

    jest.spyOn(productController, 'getProductsById').mockRejectedValueOnce(new Error('Product not found'));

    await productController.getProductsById(req, res);

    expect(res.json).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.status().send).toHaveBeenCalledWith({ status: 'Server error' });
  });
});
