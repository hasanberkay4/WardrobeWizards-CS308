import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import * as zod from 'zod';


const storage = multer.diskStorage({
    destination: './src/images/',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage }).single('image_file');


const addProductSchema = zod.object({
    name: zod.string(),
    description: zod.string(),
    stock_quantity: zod.number(),
    initial_price: zod.number(),
    category_ids: zod.array(zod.string()),
    expense: zod.number(),
    image_name: zod.string(),
    image_file: zod.any() || zod.undefined()
});

const validateAddProductForm = (req: Request, res: Response, next: NextFunction) => {
    try {
        addProductSchema.parse(req.body);
        next();
    } catch (validationError) {
        return res.status(400).send({ message: 'Invalid add product form data.', validationError });
    }
};

export { validateAddProductForm, upload };
