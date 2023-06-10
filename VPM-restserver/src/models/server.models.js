import express from 'express';
import db from '../database/config.db.js';
import cors from 'cors';
import { rolesRt } from '../routes/roles.routes.js';
import { userRt } from '../routes/user.routes.js';
import { authRT } from '../routes/auth.routes.js';
export class Server {
  constructor() {
    this.app = express();
    this.port = 5000;
    this.paths = {
      roles: '/api/role',
      users: '/api/user',
      auth: '/api/auth',
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
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server running on port: ', this.port);
    });
  }
}
