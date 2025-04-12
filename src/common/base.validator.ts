import { z } from 'zod';

export const idField = z.coerce.number().int().positive();
export const idSchema = z.object({
  id: idField,
});

export const booleanField = z
  .enum(['0', '1', 'false', 'true'])
  .transform((val) => val === '1' || val === 'true')
  .pipe(z.boolean());
