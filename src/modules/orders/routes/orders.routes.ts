import {Router} from 'express';
import {celebrate, Joi, Segments} from 'celebrate';
import OrdersController from '../controllers/OrdersController';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const ordersRouter = Router();

const ordersController = new OrdersController();



const ValidateId = () => {

  return  celebrate({
        [Segments.PARAMS]:{
            id: Joi.string().uuid().required(),
        },
    })
}

const ValidateBody = () => {

    return  celebrate({
          [Segments.BODY]:{
              customer_id: Joi.string().uuid().required(),
              products: Joi.required()
          },
      })
  }


ordersRouter.use(isAuthenticated)

ordersRouter.get('/:id', ValidateId(),ordersController.show);

ordersRouter.post('/', ValidateBody(), ordersController.create);


export default ordersRouter;