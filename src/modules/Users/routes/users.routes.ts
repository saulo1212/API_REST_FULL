import {Router} from 'express';

import {celebrate, Joi, Segments} from 'celebrate';
import UsersController from '../controllers/UsersController';
import isAuthenticated from '../middlewares/isAuthenticated';

const usersRouter = Router();

const usersController = new UsersController;


usersRouter.get('/', isAuthenticated , usersController.index);

const ValidateBody = () => {

    return  celebrate({
          [Segments.BODY]:{
              name: Joi.string().required(),
              email: Joi.string().required(),
              password: Joi.string().required()
          },
      })
  }

usersRouter.post('/', ValidateBody(), usersController.create);


export default usersRouter;