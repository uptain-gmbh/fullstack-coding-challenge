import { json, urlencoded } from 'body-parser';
import express from 'express';
import cors from 'cors';
import { join } from 'path';
import routes from './routes/index';

class App {
	public app: express.Application;

	constructor() {
		this.app = express();
		this.setConfig();
	}

	private setConfig() {
		this.app.use(cors());
		this.app.use(json()); // parser for request json format
		this.app.use(urlencoded({ extended: false }));
		this.app.use(express.static(__dirname + '/../frontend'));
		this.app.use('/', routes); // use routes for the api
		this.app.get('/*', (_req, res) => {
			res.sendFile(join(__dirname + '/../frontend/index.html'));
		});
	}
}

export default new App().app;
