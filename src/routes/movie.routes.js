import { Router } from 'express';
import { createSeeMovieUser, deleteSeeMovieUser, deleteSeeMovieUserAll, getSeeMovieUser, updateSeeMovieUser } from '../controllers/seeMovie.controller.js';
import { authRequired } from '../middlewares/AuthorizationToken.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import {createSeeMovieSchema} from '../schemas/seeMovieSchema.js';

const movieRouter = Router();

movieRouter.get('/movies',authRequired, getSeeMovieUser);
movieRouter.post('/movies',authRequired,validateSchema(createSeeMovieSchema), createSeeMovieUser);
movieRouter.put('/movies/:id',authRequired,validateSchema(createSeeMovieSchema), updateSeeMovieUser);
movieRouter.delete('/movies/:id',authRequired, deleteSeeMovieUser);
movieRouter.delete('/movies',authRequired, deleteSeeMovieUserAll);


export default movieRouter;