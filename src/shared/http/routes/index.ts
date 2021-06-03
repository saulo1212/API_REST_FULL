import {Router} from 'express';
import usersRouter from '../../../modules/Users/routes/users.routes';
import productsRouter from '../../../modules/products/routes/products.routes';
import sessionsRouter from '../../../modules/Users/routes/sessions.routes';

const routes = Router();

routes.use('/products', productsRouter);

routes.use('/users', usersRouter);

routes.use('/sessions', sessionsRouter);

export default routes;
