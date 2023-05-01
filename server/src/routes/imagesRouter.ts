import { Router } from "express";
import express from "express";
import imageController from "../controller/imageController";

const imagesRouter = Router();
imagesRouter.use(express.static('../images/'));

// all images
imagesRouter.get('/', imageController.getImages)

// get all items from a category
//imagesRouter.get('/:category', imageController.getImagesByCategory)

// specific images
//imagesRouter.get('/:category/:id', imageController.getImagesByName)

// new images path
imagesRouter.get('/:id', imageController.getImagesById);

export { imagesRouter }