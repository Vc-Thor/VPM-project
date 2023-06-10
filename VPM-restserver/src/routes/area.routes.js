import { Router } from 'express';
import {
  areaDelete,
  areaGet,
  areaPost,
  areaPut,
} from '../controllers/area.controllers';

export const areaRt = Router();

areaRt.get('/areas', areaGet);
areaRt.post('/newArea', areaPost);
areaRt.put('/:id', areaPut);
areaRt.delete('/:id', areaDelete);
