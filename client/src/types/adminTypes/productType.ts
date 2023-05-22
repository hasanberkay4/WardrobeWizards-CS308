import { z } from 'zod'

const ProductTypeSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    model: z.string(),
    color: z.string(),
    stock_quantity: z.number(),
    initial_price: z.number(),
    expense: z.number(),
    popularity: z.number(),
    category_ids: z.array(z.string()),
    rating: z.number(),
    number_of_voters: z.number(),
    warrant_status: z.boolean(),
    discountRate: z.number(),
    image: z.string(),
});

const ProductArrayTypeSchema = z.array(ProductTypeSchema);

export type ProductType = z.infer<typeof ProductTypeSchema>;
export type ProductArrayType = z.infer<typeof ProductArrayTypeSchema>;

export { ProductTypeSchema, ProductArrayTypeSchema };
