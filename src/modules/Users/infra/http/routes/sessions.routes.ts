import {Router} from 'express';

import {celebrate, Joi, Segments} from 'celebrate';
import SessionsController from '../controllers/SessionsController';


const sessionsRouter = Router();

const sessionsController = new SessionsController();

sessionsRouter.post('/', sessionsController.create);

const ValidateBody = () => {

    return  celebrate({
          [Segments.BODY]:{
              email: Joi.string().required(),
              password: Joi.string().required()
          },
      })
  }

sessionsRouter.post('/', ValidateBody(), sessionsController.create);


export default sessionsRouter;