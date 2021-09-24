import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/sequelize';

class Notification extends Model {
	public id!: number;
	public coin_id!: number;
	public price!: number;
	public market_cap!: string;
	public change!: string;
}

Notification.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true
		},
		coin_id: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{
		tableName: 'notification',
		sequelize,
		underscored: true
	}
);

export default Notification;
