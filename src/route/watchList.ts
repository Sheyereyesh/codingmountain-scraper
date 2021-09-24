import express, { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import watchListValidation from '../validation/watchListValidation';
import watchListUpdateValidation from '../validation/watchListUpdateValidation';
import WatchList from '../models/WatchList';
import ValidationError from '../errors/ValidationError';

interface WatchListRequest extends Request {
	body: {
		coin_id: number;
		max_price: number;
		min_price: number;
	};
}

interface WatchListUpdateRequest extends Request {
	body: {
		max_price: number;
		min_price: number;
	};
}

const route = express.Router();

route.post(
	'/api/watch_list',
	watchListValidation,
	async function (req: WatchListRequest, res: Response) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			throw new ValidationError(errors.array());
		}
		WatchList.create(req.body);
		res.send(req.body);
	}
);

route.put(
	'/api/watch_list/:id',
	watchListUpdateValidation,
	async function (req: WatchListUpdateRequest, res: Response) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			throw new ValidationError(errors.array());
		}
		const data = await WatchList.update(req.body, {
			where: { id: req.params.id }
		});
		res.send(data);
	}
);

route.delete(
	'/api/watch_list/:id',
	async function (req: Request, res: Response) {
		try {
			await WatchList.destroy({
				where: {
					id: req.params.id
				}
			});
			res.send('ok');
		} catch (e) {
			new Error('Something went wrong');
		}
	}
);

export default route;
