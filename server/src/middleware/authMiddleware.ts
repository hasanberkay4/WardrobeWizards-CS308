import { Request, Response, NextFunction } from 'express';
import * as zod from 'zod';

const signInSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8)
})

const signUpSchema = zod.object({
  name: zod.string(),
  email: zod.string().email(),
  password: zod.string().min(8)
})

const isValidSignInForm = (req: Request, res: Response, next: NextFunction) => {
  try {
    signInSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).send({ message: 'Invalid sign in form data.', error });
  }
};

const isValidSignUpForm = (req: Request, res: Response, next: NextFunction) => {
  try {
    signUpSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).send({ message: 'Invalid sign up form data.', error });
  }
};

export { isValidSignInForm, isValidSignUpForm };