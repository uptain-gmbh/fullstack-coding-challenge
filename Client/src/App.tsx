import React, { FunctionComponent } from 'react';
import { ListContainer, HeaderContainer } from './containers';
import { Header, Main } from './components';

export const App:FunctionComponent = () => 
    <Main>
        <HeaderContainer/>
        <ListContainer/>
    </Main>
