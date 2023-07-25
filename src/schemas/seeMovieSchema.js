import { z } from 'zod';

export const createSeeMovieSchema = z.object({
    date_see: z.string({
        invalid_type_error: 'Ingrese una fecha valida'
    }).optional(),
    state: z.string({
        required_error: 'El estado de la película es requerido',
    }),
});
