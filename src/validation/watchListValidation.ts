import { body } from 'express-validator';
import WatchList from '../models/WatchList';

export default [
	body('coin_id')
		.notEmpty()
		.custom((value) => {
			return WatchList.findOne({
				where: {
					coin_id: value
				}
			}).then((watchlistItem) => {
				if (watchlistItem) {
					return Promise.reject('Coin already on Watch List');
				}
			});
		}),
	body('max_price').notEmpty(),
	body('min_price')
		.notEmpty()
		.custom((value, meta) => {
			if (parseFloat(value) >= parseFloat(meta.req.body.max_price)) {
				return Promise.reject('value should be smaller then Max Price');
			}
			return true;
		})
];
