import { connect } from 'react-redux';
import { Action, Dispatch } from "redux";
import { actionFetchWishlistProducts } from '../../store/actions/index';
import { IRootReducer } from '../../store/reducers';
import { IAppStateProps } from './IListStateProps';
import { IAppDispatchProps } from './IListDispatchProps';
import { List } from '../../components/List';



const mapStateToProps = ({ boats }: IRootReducer): IAppStateProps => ({
  boats
});

 const mapDispatchToProps = (dispatch: Dispatch<Action>): IAppDispatchProps => ({
  fetchBoatsList: () => dispatch(actionFetchWishlistProducts()),
});

 export const ListContainer =  connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
