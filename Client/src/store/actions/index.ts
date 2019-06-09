import { Action } from 'redux';
import { IBoat, IAction } from '../../models';
import { FETCH_BOATS_LIST, SET_BOATS_LIST, ADD_BOAT, ADD_BOAT_TO_LOCAL_LIST } from '../constants'

export const actionFetchBoats = (): Action => ({
    type: FETCH_BOATS_LIST,
});

export const actionSetBoats = (payload: IBoat[]): IAction<IBoat[]> => ({
    type: SET_BOATS_LIST,
    payload,
});

export const actionAddBoat = (payload: IBoat): IAction<IBoat> => ({
    type: ADD_BOAT,
    payload,
});

export const actioAddBoatToLocalList = (payload: IBoat): IAction<IBoat> => ({
    type: ADD_BOAT_TO_LOCAL_LIST,
    payload,
})
