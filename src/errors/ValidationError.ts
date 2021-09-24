import CustomError from './CustomError';

export default class ValidationError extends CustomError {
	statusCode = 422;
}
