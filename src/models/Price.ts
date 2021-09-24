import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/sequelize';

class Price extends Model {
	public id!: number;
	public coin_id!: number;
	public price!: number;
	public market_cap!: string;
	public change!: string;
}

Price.init(
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
		price: {
			type: DataTypes.FLOAT,
			allowNull: false
		},
		market_cap: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		change: {
			type: DataTypes.STRING(255),
			allowNull: false
		}
	},
	{
		tableName: 'prices',
		sequelize,
		underscored: true
	}
);

export default Price;
