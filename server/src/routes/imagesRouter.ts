import { Router } from "express";
import express from "express";
import imageController from "../controller/imageController";

const imagesRouter = Router();
imagesRouter.use(express.static('../images/'));

// all images
imagesRouter.get('/images/', imageController.getImages)

// get all items from a category
imagesRouter.get('/images/:category', imageController.getImagesByCategory)

// specific images
imagesRouter.get('/images/:category/:id', imageController.getImagesByName)

export { imagesRouter }