import { Sequelize } from 'sequelize';

const db = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASS, {
  host: 'mysql-service',
  dialect: 'mysql',
});

export default db;
