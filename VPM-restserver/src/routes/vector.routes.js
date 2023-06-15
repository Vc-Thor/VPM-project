import { Router } from 'express';
import {
  vectorDelete,
  vectorGet,
  vectorGetById,
  vectorPost,
  vectorPut,
} from '../controllers/vector.controllers.js';
import { noVector, validatorVector } from '../helpers/db-validators.js';
import { check } from 'express-validator';
import { fieldValidation } from '../middlewares/field-validation.js';

export const vectorRt = Router();

vectorRt.get('/vectors', vectorGet);
vectorRt.get(
  '/:id',
  [check('id').custom(noVector), fieldValidation],
  vectorGetById,
);
vectorRt.post(
  '/newVector',
  [check('vector').custom(validatorVector), fieldValidation],
  vectorPost,
);
vectorRt.put(
  '/:id',
  [
    check('id').custom(noVector),
    check('vector').custom(validatorVector),
    fieldValidation,
  ],
  vectorPut,
);
vectorRt.delete(
  '/:id',
  [check('id').custom(noVector), fieldValidation],
  vectorDelete,
);
