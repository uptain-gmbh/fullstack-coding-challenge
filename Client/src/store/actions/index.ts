import { Action } from 'redux';
import { IBoat, IAction } from '../../models';
import { FETCH_BOATS_LIST, SET_BOATS_LIST } from '../constants'

export const actionFetchWishlistProducts = (): Action => ({
    type: FETCH_BOATS_LIST,
});

export const actionSetWishlistProducts = (payload: IBoat[]): IAction<IBoat[]> => ({
    type: SET_BOATS_LIST,
    payload,
});

