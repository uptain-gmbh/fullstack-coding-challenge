import { Router } from 'express';
import { executeStatement } from '../scripts/database';
import { internalErrorHandler, successHandler } from '../scripts/eventHandler';

const router = Router();

// get all items in the basket
router.get('/getAllBasketItems', async (_req, res) => {
	try {
		const SQL = 'SELECT * from uptain.basket order by 1 desc';
		const allBasketItems = await executeStatement(SQL);
		res.json(allBasketItems);
	} catch (err) {
		internalErrorHandler(err.toString(), res);
	}
});

// add item to basket
router.post('/addBasketItem', (req, res) => {
	try {
		const SQL = 'Insert into uptain.basket(STUFF)values(?)';
		const insertValue = req.body.STUFF;
		executeStatement(SQL, insertValue).then(() => successHandler('Successful insert', res));
	} catch (err) {
		internalErrorHandler(err.toString(), res);
	}
});

export default router;
