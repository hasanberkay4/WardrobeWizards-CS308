import { z } from 'zod';

const ModelTypeSchema = z.object({
    _id: z.string(),
    name: z.string(),
    slug: z.string(),
});

const ModelArrayTypeSchema = z.array(ModelTypeSchema);

export type ModelType = z.infer<typeof ModelTypeSchema>;
export type ModelArrayType = z.infer<typeof ModelArrayTypeSchema>;

export { ModelTypeSchema, ModelArrayTypeSchema };