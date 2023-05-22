import * as zod from 'zod';

export type CommentType = {
    _id: string,
    customerId: string,
    productId: string,
    date: string,
    description: string
    approved: boolean,
    rating: number,
    __v: number,
};

export type CommentArrayType = Array<CommentType>;

export const CommentTypeSchema: zod.ZodSchema<CommentType> = zod.object({
    _id: zod.string(),
    customerId: zod.string(),
    productId: zod.string(),
    date: zod.string(),
    description: zod.string(),
    approved: zod.boolean(),
    rating: zod.number(),
    __v: zod.number(),
});

export const CommentArrayTypeSchema: zod.ZodSchema<CommentArrayType> = zod.array(CommentTypeSchema);


