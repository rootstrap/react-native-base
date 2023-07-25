import z from 'zod';

const NativeConfigSchema = z.object({
  API_URL: z.string(),
  BASE_URL: z.string(),
});

export type NativeConfigType = z.infer<typeof NativeConfigSchema>;
export default NativeConfigSchema;
