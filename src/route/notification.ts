import express, { Request, Response } from 'express';
import Notification from '../models/Notification';

const route = express.Router();

route.get('/api/notification', async function (req: Request, res: Response) {
	const notifications = await await Notification.findAll({
		order: [['created_at', 'desc']]
	});
	res.send(notifications);
});

export default route;
