import { Request, Response, NextFunction } from 'express';
import * as zod from 'zod';

const userTokenSchema = zod.object({
    token: zod.string(),
    email: zod.string(),

})

const isValidUserToken = (req: Request, res: Response, next: NextFunction) => {

};

export { isValidUserToken };