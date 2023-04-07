import { Router } from "express";
import authController from "../controller/authController"
import { body, CustomValidator } from 'express-validator';
import User from "../models/user"

const router = Router();

const isValidUser: CustomValidator = email => {
    return User.findOne({email:email}).then(user => {
      if (user) {
        return Promise.reject('E-mail already in use');
      }
    });
  };

router.post("/signup", [
    body("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .custom(isValidUser)
    .normalizeEmail(),
    
    body('password')
    .trim()
    .isLength({ min: 6 }),

    body("name")
    .trim()
    .not()
    .isEmpty(),

    body("surname")
    .trim()
    .not()
    .isEmpty(),

    body("adress")
    .trim()
    .not()
    .isEmpty(),

], authController.signUp)

router.post("/login", [], authController.login)

export default router
