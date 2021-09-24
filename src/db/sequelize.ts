import { Sequelize } from 'sequelize';
import config from '../config/db.js';

const sequelize = new Sequelize(
	config.development.database as string,
	config.development.username as string,
	config.development.password as string,
	{
		host: config.development.host as string,
		dialect: 'mysql'
	}
);

export default sequelize;
