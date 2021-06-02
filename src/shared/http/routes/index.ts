import {Router} from 'express';
import usersRouter from '../../../modules/Users/routes/users.routes';
import productsRouter from '../../../modules/products/routes/products.routes';

const routes = Router();

routes.use('/products', productsRouter);

routes.use('/users', usersRouter);

export default routes;
