import React,{ FunctionComponent, Fragment, useEffect} from "react"
import { IAppStateProps } from "../containers/List/IListStateProps";
import { IAppDispatchProps } from "../containers/List/IListDispatchProps";

export const List:FunctionComponent<IAppStateProps & IAppDispatchProps> = ({boats, fetchSubjects}) => {
    useEffect(()=>{
      fetchSubjects()
    },[])
    return (
      <Fragment>
          {boats.map((boat) => (
            <p key={boat.id}>{boat.name}</p>
          )
          )}
      </Fragment>
    );
  }
