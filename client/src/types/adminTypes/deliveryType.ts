import { ProductArrayTypeSchema } from "./productType";
import { z } from 'zod';

const DeliveryTypeSchema = z.object({
    _id: z.string(),
    deliveryAddress: z.string(),
    customerId: z.string(),
    quantity: z.number(),
    totalPrice: z.number(),
    status: z.string(),
    date: z.string(),
    products: ProductArrayTypeSchema,
    __v: z.number(),
    pdfUrl: z.string(),
});

const DeliveryArrayTypeSchema = z.array(DeliveryTypeSchema);

export type DeliveryType = z.infer<typeof DeliveryTypeSchema>;
export type DeliveryArrayType = z.infer<typeof DeliveryArrayTypeSchema>;

export { DeliveryTypeSchema, DeliveryArrayTypeSchema }