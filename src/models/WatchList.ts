import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/sequelize';

class WatchList extends Model {
	public id!: number;
	public coin_id!: number;
	public max_price!: number;
	public min_price!: number;
}

WatchList.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true
		},
		coin_id: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false
		},
		max_price: {
			type: DataTypes.FLOAT,
			allowNull: false
		},
		min_price: {
			type: DataTypes.FLOAT,
			allowNull: false
		}
	},
	{
		tableName: 'watch_list',
		sequelize,
		underscored: true
	}
);

export default WatchList;
