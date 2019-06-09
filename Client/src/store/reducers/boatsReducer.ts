import { SET_BOATS_LIST, ADD_BOAT_TO_LOCAL_LIST } from '../constants';
import { IBoat, IAction } from '../../models';
export const boatsInitialState: IBoat[] = []


export default (state: IBoat[] = boatsInitialState, action: IAction<any>): IBoat[] => {
    switch (action.type) {
        case SET_BOATS_LIST:  
            return  action.payload;
        case ADD_BOAT_TO_LOCAL_LIST:  
            return  [action.payload, ...state];
        default:
            return state;
     }
}
