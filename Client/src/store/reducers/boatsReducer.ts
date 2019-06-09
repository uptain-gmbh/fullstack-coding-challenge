/* tslint:disable */
import { SET_BOATS_LIST } from '../constants';
import { IBoat, IAction } from '../../models';
export const boatsInitialState: IBoat[] = []


export default (state: IBoat[] = boatsInitialState,action: IAction<any>): IBoat[] => {
    switch (action.type) {
        case SET_BOATS_LIST:  
            return  action.payload;
        default:
            return state;
     }
}
     
       
