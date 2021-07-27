import {Router} from 'express';

import {celebrate, Joi, Segments} from 'celebrate';
import UsersController from '../controllers/UsersController';
import isAuthenticated from '../../../../../shared/Infra/http/middlewares/isAuthenticated';
import multer from 'multer';
import uploadConfig from '../../../../../config/upload';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();

const usersController = new UsersController;

const usersAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);


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


usersRouter.patch('/avatar', isAuthenticated, upload.single('avatar'), usersAvatarController.update);


export default usersRouter;