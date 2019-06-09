import { IBoat } from './../../models/IBoat';
import { combineReducers } from 'redux';
import boatsReducer,{ boatsInitialState } from './boatsReducer';

export interface IRootReducer{ 
  boats: IBoat[];
}

export const rootInitialState = {
  boats: boatsInitialState
};

export default combineReducers({boats: boatsReducer});
