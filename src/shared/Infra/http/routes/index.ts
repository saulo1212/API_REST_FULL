import {Router} from 'express';
import usersRouter from '../../../../modules/Users/routes/users.routes';
import productsRouter from '../../../../modules/products/routes/products.routes';
import sessionsRouter from '../../../../modules/Users/routes/sessions.routes';
import passwordRouter from '../../../../modules/Users/routes/password.routes';
import profilesRouter from '../../../../modules/Users/routes/profile.routes';
import customersRouter from '../../../../modules/customers/infra/http/routes/customers.routes';
import ordersRouter from '../../../../modules/orders/routes/orders.routes';

const routes = Router();

routes.use('/products', productsRouter);

routes.use('/users', usersRouter);

routes.use('/sessions', sessionsRouter);

routes.use('/password', passwordRouter);

routes.use('/profile', profilesRouter);

routes.use('/customers', customersRouter);

routes.use('/orders', ordersRouter);

export default routes;
