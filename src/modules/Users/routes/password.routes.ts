import {Router} from 'express';
import {celebrate, Joi, Segments} from 'celebrate';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';


const passwordRouter = Router();

const forgotPasswrodController = new ForgotPasswordController;
const resetPasswordControlelr = new ResetPasswordController();

const ValidateBody = () => {

    return  celebrate({
          [Segments.BODY]:{
              email: Joi.string().required(),
          },
      })
  }


  const ValidateReset = () => {

    return  celebrate({
          [Segments.BODY]:{
              token: Joi.string().uuid().required(),
              password: Joi.string().required(),
              password_confirmation:Joi.string().required().valid(Joi.ref('password'))
          },
      })
  }

passwordRouter.post('/forgot', ValidateBody(), forgotPasswrodController.create);

passwordRouter.post('/reset', ValidateReset(), resetPasswordControlelr.create);


export default passwordRouter;