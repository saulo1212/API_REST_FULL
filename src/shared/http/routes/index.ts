import {Router} from 'express';
import usersRouter from '../../../modules/Users/routes/users.routes';
import productsRouter from '../../../modules/products/routes/products.routes';
import sessionsRouter from '../../../modules/Users/routes/sessions.routes';
import passwordRouter from '../../../modules/Users/routes/password.routes';

const routes = Router();

routes.use('/products', productsRouter);

routes.use('/users', usersRouter);

routes.use('/sessions', sessionsRouter);

routes.use('/password', passwordRouter);

export default routes;
