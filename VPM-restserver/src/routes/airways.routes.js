import { Router } from 'express';
import {
  airwaysDelete,
  airwaysGet,
  airwaysPost,
  airwaysPut,
} from '../controllers/airways.controllers.js';
import { noAirways, validatorAirways } from '../helpers/db-validators.js';
import { check } from 'express-validator';
import { fieldValidation } from '../middlewares/field-validation.js';

export const airwaysRt = Router();

airwaysRt.get('/airwayss', airwaysGet);
airwaysRt.post(
  '/newairways',
  [check('airways').custom(validatorAirways), fieldValidation],
  airwaysPost,
);
airwaysRt.put(
  '/:id',
  [
    check('id').custom(noAirways),
    check('airways').custom(validatorAirways),
    fieldValidation,
  ],
  airwaysPut,
);
airwaysRt.delete(
  '/:id',
  [check('id').custom(noAirways), fieldValidation],
  airwaysDelete,
);
