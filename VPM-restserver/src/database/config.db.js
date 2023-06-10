import { Sequelize } from 'sequelize';

const db = new Sequelize('production_db', 'devHugo', '1q2w3e', {
  host: 'localhost',
  dialect: 'mysql',
});

export default db;
