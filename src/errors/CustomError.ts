interface ErrorType {
	msg: string;
	param: string;
}

interface ParsedError {
	errors: ErrorType[];
	statusCode: number;
}

export default abstract class CustomError extends Error {
	public abstract statusCode: number;

	constructor(private errors: { msg: string; param: string }[]) {
		super();
		Object.setPrototypeOf(this, CustomError.prototype);
	}

	public parse(): ParsedError {
		return { errors: this.errors, statusCode: this.statusCode };
	}
}
