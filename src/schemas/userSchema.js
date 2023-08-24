import { z } from 'zod';

export const registerUserSchema = z.object({
    username: z.string({
        required_error: 'El nombre de usuario es requerido'
    }),
    email: z.string({
        required_error: 'El correo es requerido'
    }).email({
        message: 'Ingrese un correo valido'
    }),
    password: z.string({
        required_error: 'La contraseña es requerida'
    }).min(8, {
        message: 'Se requiere una contraseña de al menos 8 caracteres'
    }),
    confirm_password: z.string({
        required_error: 'La confirmacion de contraseña es requerida'
    })
});

export const loginUserSchema = z.object({
    //El nombre de usuario o el correo son requeridos
    password: z.string({
        required_error: 'La contraseña es requerida'
    }).min(8, {
        message: 'Se requiere una contraseña de al menos 8 caracteres'
    }),
});