import { z } from 'zod';

const CategoryTypeSchema = z.object({
    _id: z.string(),
    name: z.string(),
    slug: z.string()
});

const CategoryArrayTypeSchema = z.array(CategoryTypeSchema);

export type CategoryType = z.infer<typeof CategoryTypeSchema>;
export type CategoryArrayType = z.infer<typeof CategoryArrayTypeSchema>;

export { CategoryTypeSchema, CategoryArrayTypeSchema };