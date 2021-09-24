import path from 'path';
import express, { Request, Response } from 'express';

const route = express.Router();

route.get('/', function (req: Request, res: Response) {
	res.sendFile(path.resolve(__dirname, '../../client/build/index.html'));
});

export default route;
