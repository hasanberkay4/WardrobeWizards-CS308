import { z } from 'zod';

const ColorTypeSchema = z.object({
    _id: z.string(),
    name: z.string(),
    slug: z.string(),
});

const ColorArrayTypeSchema = z.array(ColorTypeSchema);

export type ColorType = z.infer<typeof ColorTypeSchema>;
export type ColorArrayType = z.infer<typeof ColorArrayTypeSchema>;

export { ColorTypeSchema, ColorArrayTypeSchema };