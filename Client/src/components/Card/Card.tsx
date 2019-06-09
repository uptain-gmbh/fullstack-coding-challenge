import React,{FunctionComponent} from 'react';
import { CardWrapper } from './CardWrapper';
import { CardHeader } from './CardHeader';
import { CardButtom } from './CardButtom';
import { IBoat, IAction } from '../../models';

export interface ICardProps {
    boat: IBoat;
}

export const Card: FunctionComponent<ICardProps> = ({boat:{name, price}}) => (
    <CardWrapper>
        <CardHeader/>
        <CardButtom> 
            <h5>{`model: ${name}`}</h5>
            <h5>{`price: ${price}`}</h5>
        </CardButtom>
    </CardWrapper>
)


