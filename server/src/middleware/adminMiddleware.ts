import { Request, Response, NextFunction } from 'express';
import * as zod from 'zod';

const signInSchema = zod.object({
    username: zod.string(),
    password: zod.string().min(8),
    title: zod.string(),
})

const isValidAdminSignInForm = (req: Request, res: Response, next: NextFunction) => {
    try {
        signInSchema.parse(req.body);
        next();
    } catch (error) {
        res.status(400).send({ message: 'Invalid sign in form data.', error });
    }
};

// same as above but for sign up
const isValidAdminSignUpForm = (req: Request, res: Response, next: NextFunction) => {
    try {
        signInSchema.parse(req.body);
        next();
    } catch (error) {
        res.status(400).send({ message: 'Invalid sign up form data.', error });
    }
};



export { isValidAdminSignInForm, isValidAdminSignUpForm };