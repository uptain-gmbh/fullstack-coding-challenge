import { Response } from 'express';

export function successHandler(message: string, res: Response) {
	res.status(200).json({ message });
}

export function internalErrorHandler(error: string, res: Response) {
	res.status(500).send(error);
}
