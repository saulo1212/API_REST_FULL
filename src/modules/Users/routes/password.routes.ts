import {Router} from 'express';
import {celebrate, Joi, Segments} from 'celebrate';
import ForgotPasswordController from '../controllers/ForgotPasswordController';


const passwordRouter = Router();

const forgotPasswrodController = new ForgotPasswordController;

const ValidateBody = () => {

    return  celebrate({
          [Segments.BODY]:{
              email: Joi.string().required(),
          },
      })
  }

passwordRouter.post('/forgot', ValidateBody(), forgotPasswrodController.create);


export default passwordRouter;