import {Application} from 'express';
import bodyParser from 'body-parser';
import { getList } from './controllers';

import { Logger } from '@overnightjs/logger';


export class UptainServer {

    private readonly SERVER_START_MSG = 'Uptain server started on port: ';
    private readonly DEV_MSG = 'This is Uptain Server';
    private application: Application ;

    constructor(applicationServer: Application) {
        this.application = applicationServer ;
        this.application.use(bodyParser.json());
        this.application.use(bodyParser.urlencoded({ extended: true }));
        this.application.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header(
                'Access-Control-Allow-Headers',
                 'Origin, X-Requested-With, Content-Type, Accept',
            );
            next();
         });
        this.application.get('/', (req, res) => res.send(this.DEV_MSG));
        this.application.get('/Boats/List', getList );
    }

    public start(port: number): void {
        this.application.set('port', port);
        this.application.listen(port, () => {
            Logger.Imp(this.SERVER_START_MSG + port);
        });
    }
}


