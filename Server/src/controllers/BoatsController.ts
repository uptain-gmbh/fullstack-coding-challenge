import { OK, BAD_REQUEST } from 'http-status-codes';
import { Logger } from '@overnightjs/logger';
import { Request, Response } from 'express';
import { boatsList } from '../Fixtures';


export const getList = (req: Request, res: Response) => {

    const SUCCESS_MSG = 'Responding to boats List request ... ';
    try {
        Logger.Info(SUCCESS_MSG);
        return res.status(OK).json({
            data: boatsList,
        });
    } catch (err) {
        Logger.Err(err, true);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
};

