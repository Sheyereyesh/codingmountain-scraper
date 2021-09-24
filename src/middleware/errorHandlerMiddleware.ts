import { Request, Response, NextFunction } from 'express';
import CustomError from '../errors/CustomError';

export default function (
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction
): void {
	if (error instanceof CustomError) {
		res.status(error.statusCode).send({ ...error.parse() });
		return;
	}
	res.status(500).send(error);
}
