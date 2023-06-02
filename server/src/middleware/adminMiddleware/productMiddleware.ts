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
    expense: zod.number(),
    category_slugs: zod.array(zod.string()),
    warranty_status: zod.boolean(),
    image: zod.string(),
});


export { upload, addProductSchema };
