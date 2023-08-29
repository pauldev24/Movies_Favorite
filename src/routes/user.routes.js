import { Router } from 'express';
import { register, login, logout, deleteUsers, verifyToken, updateUser } from '../controllers/user.controller.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { loginUserSchema, registerUserSchema, updateUserSchema } from '../schemas/userSchema.js';
import { authRequired } from '../middlewares/AuthorizationToken.js';

const userRouter = Router();

userRouter.post('/register', validateSchema(registerUserSchema), register);
userRouter.post('/login', validateSchema(loginUserSchema), login);
userRouter.post('/logout', logout);
userRouter.get('/verify', verifyToken);
userRouter.put('/update', authRequired, validateSchema(updateUserSchema), updateUser);
//userRouter.delete('/users/delete', deleteUsers);

export default userRouter;
