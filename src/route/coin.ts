import express, { Request, Response } from 'express';
import Coin from '../models/Coin';

const route = express.Router();

route.get('/api/coin', async function (req: Request, res: Response) {
	const coins = await Coin.findAll({
		include: ['price', 'watch_list']
	});
	res.send(coins);
});

export default route;
