import React,{ FunctionComponent, Fragment, useEffect} from "react"
import { IAppStateProps } from "../containers/List/IListStateProps";
import { IAppDispatchProps } from "../containers/List/IListDispatchProps";
import { Card } from "./Card/Card"
import styled from 'styled-components';

export const List:FunctionComponent<IAppStateProps & IAppDispatchProps> = ({boats, fetchBoatsList}) => {
    useEffect(()=>{
      fetchBoatsList()
    },[])
    return (
      <ListWrapper>
          {boats.map((boat) => boat ? (
            <Card key={boat.id} boat={boat}/>
          ) : (<div/>)
          )}
      </ListWrapper>
    );
  }

const ListWrapper = styled.div.attrs({className: "List"})`
    display: flex;
    flex-wrap: wrap;
`
