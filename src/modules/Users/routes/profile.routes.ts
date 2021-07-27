import {Router} from 'express';
import {celebrate, Joi, Segments} from 'celebrate';
import isAuthenticated from '../../../shared/Infra/http/middlewares/isAuthenticated';
import ProfileController from '../controllers/ProfileController';


const profilesRouter = Router();

const profileController = new ProfileController

profilesRouter.use(isAuthenticated);

profilesRouter.get('/', profileController.show);

const ValidateBody = () => {

    return  celebrate({
          [Segments.BODY]:{
              name: Joi.string().required(),
              email: Joi.string().email().required(),
              old_password: Joi.string(),
              password: Joi.string().optional(),
              password_confirmation: Joi.string()
                .valid(Joi.ref('password'))
                .when('password',{
                  is: Joi.exist(),
                  then: Joi.required()
              })
          },
      })
  }

profilesRouter.put('/', ValidateBody(), profileController.update);



export default profilesRouter;