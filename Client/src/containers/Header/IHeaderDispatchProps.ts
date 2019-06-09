import { Action } from 'redux';
import { IBoat } from '../../models';

export interface IHeaderDispatchProps {
    addBoat: (boat: IBoat) => Action;
}
