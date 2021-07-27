import {Router} from 'express';
import {celebrate, Joi, Segments} from 'celebrate';
import CustomersController from '../controllers/CustomersController';
import isAuthenticated from '../../../../../shared/Infra/http/middlewares/isAuthenticated';

const customersRouter = Router();

const customersController = new CustomersController();

customersRouter.use(isAuthenticated);

customersRouter.get('/', customersController.index);

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
              name: Joi.string().required(),
              email: Joi.string().email().required(),
    
          },
      })
  }

customersRouter.get('/:id', ValidateId(),customersController.show);

customersRouter.post('/', ValidateBody(), customersController.create);


customersRouter.put('/:id', ValidateId(), ValidateBody(), customersController.updated);

customersRouter.delete('/:id', ValidateId(), customersController.delete);

export default customersRouter;