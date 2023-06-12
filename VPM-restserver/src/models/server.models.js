import express from 'express';
import db from '../database/config.db.js';
import cors from 'cors';
import { rolesRt } from '../routes/roles.routes.js';
import { userRt } from '../routes/user.routes.js';
import { authRT } from '../routes/auth.routes.js';
import { areaRt } from '../routes/area.routes.js';
import { subAreaRt } from '../routes/subArea.routes.js';
import { airwaysRt } from '../routes/airways.routes.js';
import { criteriaRt } from '../routes/criteria.routes.js';
import { activityRt } from '../routes/activity.routes.js';
export class Server {
  constructor() {
    this.app = express();
    this.port = 5000;
    this.paths = {
      roles: '/api/role',
      users: '/api/user',
      auth: '/api/auth',
      area: '/api/area',
      subArea: '/api/subarea',
      airways: '/api/airways',
      criteria: '/api/criteria',
      activity: '/api/activity',
    };
    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  async dbConnection() {
    try {
      await db.authenticate();
      console.log('database online');
    } catch (e) {
      throw new Error(e);
    }
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }
  routes() {
    this.app.use(this.paths.roles, rolesRt);
    this.app.use(this.paths.users, userRt);
    this.app.use(this.paths.auth, authRT);
    this.app.use(this.paths.area, areaRt);
    this.app.use(this.paths.subArea, subAreaRt);
    this.app.use(this.paths.airways, airwaysRt);
    this.app.use(this.paths.criteria, criteriaRt);
    this.app.use(this.paths.activity, activityRt);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server running on port: ', this.port);
    });
  }
}
