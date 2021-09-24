import {
	Model,
	DataTypes,
	HasOneCreateAssociationMixin,
	HasOneSetAssociationMixin,
	HasOneGetAssociationMixin
} from 'sequelize';
import sequelize from '../db/sequelize';
import Price from './Price';
import WatchList from './WatchList';

class Coin extends Model {
	public id!: number;
	public name!: string;
	public image!: string;
	public code!: string;
	public price!: number;
	public market_cap!: string;
	public change!: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	public createPrice!: HasOneCreateAssociationMixin<Price>;
	public setPrice!: HasOneSetAssociationMixin<Price, number>;
	public getPrice!: HasOneGetAssociationMixin<Price>;
	public createWatchList!: HasOneCreateAssociationMixin<WatchList>;
	public setWatchList!: HasOneSetAssociationMixin<WatchList, number>;
	public getWatchlist!: HasOneGetAssociationMixin<WatchList>;
}

Coin.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		image: {
			type: new DataTypes.STRING(255),
			allowNull: false
		},
		code: {
			type: new DataTypes.STRING(255),
			allowNull: false
		}
	},
	{
		tableName: 'coins',
		sequelize,
		underscored: true
	}
);

Coin.hasOne(Price, {
	as: 'price',
	foreignKey: {
		name: 'coin_id'
	}
});

Coin.hasOne(WatchList, {
	as: 'watch_list',
	foreignKey: { name: 'coin_id' }
});

export default Coin;
