import { ProductArrayTypeSchema } from "./productType";
import { z } from 'zod';

/* 

_id
647a05ebc57a9b157ec67e8d
customer_id
646fb6871ba92428dbddf11f
total_price
2922
status
"cancelled"
date
"2020-01-02"

products
Array

0
Object
product_id
646fb36d1ba92428dbddf007
quantity
5
status
"pending"

1
Object
product_id
646fb36d1ba92428dbddf094
quantity
2
status
"pending"

*/

const DeliveryTypeSchema = z.object({
    _id: z.string(),
    customerId: z.string(),
    totalPrice: z.number(),
    status: z.string(),
    date: z.string(),
    // deliveryAddress: z.string(),
    // quantity: z.number(),
    //products: ProductArrayTypeSchema,
    products: z.array(z.object({
        productId: z.string(),
        quantity: z.number(),
        status: z.string(),
    })),
    // __v: z.number(),
    // pdfUrl: z.string(),
});

const DeliveryArrayTypeSchema = z.array(DeliveryTypeSchema);

export type DeliveryType = z.infer<typeof DeliveryTypeSchema>;
export type DeliveryArrayType = z.infer<typeof DeliveryArrayTypeSchema>;

export { DeliveryTypeSchema, DeliveryArrayTypeSchema }