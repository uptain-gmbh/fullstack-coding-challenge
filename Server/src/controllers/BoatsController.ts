import { OK, BAD_REQUEST } from 'http-status-codes';
import { Logger } from '@overnightjs/logger';
import { Request, Response } from 'express';
import { IBoat } from '../models/IBoat';
import { boatsList } from '../fixtures';


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

export const addBoat = (req: Request, res: Response) => {

    const SUCCESS_MSG = 'Responding to boat Add Item request ... ';

    const { name, price } = req.body;

    const newBoat: IBoat = {
        id: (parseInt(boatsList[boatsList.length - 1].id, 0) + 1).toString(),
        name,
        price,
    };
    try {
        Logger.Info(SUCCESS_MSG);
        boatsList.push(newBoat);
        return res.status(OK).json({
            data: newBoat,
            name,
            price,
        });
    } catch (err) {
        Logger.Err(err, true);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
};

