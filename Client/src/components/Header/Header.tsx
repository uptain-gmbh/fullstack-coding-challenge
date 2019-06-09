import styled from "styled-components"
import React,{FunctionComponent, useState, ChangeEvent} from 'react';
import { IHeaderStateProps, IHeaderDispatchProps } from "../../containers/Header";
import { HeaderWrapper } from "./HeaderWrapper";
import { Button } from '../Button';
import { Title, Count } from './Title';
import { IBoat } from "../../models"
import faker from "faker/locale/de";


interface IError  {
    name?: string;
    price?: string;
}


export const  Header: FunctionComponent<IHeaderStateProps & IHeaderDispatchProps> = ({boats, addBoat}) => {

    const [newBoat, setNewBoat] = useState<IBoat>({id: "0", name:"", price: 0});
    const handleButtonCick = () => {
        const name = faker.lorem.word();
        const price = faker.random.number();
        addBoat({id:"0", name, price})
    }

    return (
        <HeaderWrapper>
            <Count>{boats ? boats.length : ''}</Count>
            <Title>Uptain Summer Boats</Title>
            <Button onClick={handleButtonCick} >Add a Boat</Button>
        </HeaderWrapper>
    )

}


/*     addBoat({id: "-1" ,name:"bottia", price: 57})
 */   
