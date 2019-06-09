import React, {Fragment, FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';
import { Action, Dispatch } from "redux";
import { actionFetchWishlistProducts } from './store/actions/index';
import { IBoat } from '../../Server/src/models/IBoat';
import { IRootReducer } from './store/reducers';

export interface IAppDispatchProps{
  fetchSubjects: () => Action
}

export interface IAppStateProps{
  boats: IBoat[];
}


export const App:FunctionComponent<IAppStateProps & IAppDispatchProps> = ({boats, fetchSubjects}) => {
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

const mapStateToProps = ({ boats }: IRootReducer): IAppStateProps => ({
  boats
});

 const mapDispatchToProps = (dispatch: Dispatch<Action>): IAppDispatchProps => ({
  fetchSubjects: () => dispatch(actionFetchWishlistProducts()),
});

 export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
