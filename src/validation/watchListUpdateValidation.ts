import { body, param } from 'express-validator';
import WatchList from '../models/WatchList';

export default [
	param('id').custom((value) => {
		return WatchList.findByPk(value).then((watchListItem) => {
			if (!watchListItem) {
				return Promise.reject('Invalid Watch List Item');
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
