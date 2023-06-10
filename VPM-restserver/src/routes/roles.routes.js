import { Router } from 'express';
import {
  roleDelete,
  rolePost,
  rolePut,
  rolesGet,
} from '../controllers/roles.controllers.js';
import { fieldValidation } from '../middlewares/field-validation.js';
import { check } from 'express-validator';
import { existsRole } from '../helpers/db-validators.js';

export const rolesRt = Router();

rolesRt.get('/roles', rolesGet);
rolesRt.post(
  '/newRole',
  [
    check('role', 'role is requerid').not().isEmpty(),
    check('role').custom(existsRole),
    fieldValidation,
  ],
  rolePost,
);
rolesRt.put(
  '/:id',
  [
    check('role', 'role is requerid').not().isEmpty(),
    check('role').custom(existsRole),
    fieldValidation,
  ],
  rolePut,
);
rolesRt.delete('/:id', [fieldValidation], roleDelete);
