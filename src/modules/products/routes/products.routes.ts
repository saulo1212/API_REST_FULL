import {json, Router} from 'express';
import ProductsController from '../controllers/ProductsController';
import {celebrate, Joi, Segments} from 'celebrate';

const productsRouter = Router();

const productsController = new ProductsController();


productsRouter.get('/', productsController.index);

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
              price: Joi.number().precision(2).required(),
              quantity: Joi.number().required()
          },
      })
  }

productsRouter.get('/:id', ValidateId(),productsController.show);

productsRouter.post('/', ValidateBody(), productsController.create);


productsRouter.put('/:id', ValidateId(), ValidateBody(), productsController.updated);
productsRouter.delete('/:id', ValidateId(), productsController.delete);

export default productsRouter;