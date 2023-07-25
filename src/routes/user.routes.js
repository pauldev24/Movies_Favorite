import { Router } from 'express';
import { register, login, logout, deleteUsers } from '../controllers/user.controller.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { loginUserSchema, registerUserSchema } from '../schemas/userSchema.js';

const userRouter = Router();

userRouter.post('/register', validateSchema(registerUserSchema), register);
userRouter.post('/login', validateSchema(loginUserSchema), login);
userRouter.post('/logout', logout);
//userRouter.delete('/users/delete', deleteUsers);

export default userRouter;
