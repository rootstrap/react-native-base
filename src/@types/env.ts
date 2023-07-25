import z from 'zod';

const NativeConfig = z.object({
  API_URL: z.string(),
  BASE_URL: z.string(),
});

export type NativeConfigType = z.infer<typeof NativeConfig>;
export default NativeConfig;
