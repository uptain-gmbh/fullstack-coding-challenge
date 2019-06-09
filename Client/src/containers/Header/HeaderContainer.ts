import { IHeaderDispatchProps } from './IHeaderDispatchProps';
import { Action, Dispatch } from "redux";
import { connect } from 'react-redux';
import { IRootReducer } from '../../store/reducers';
import { Header } from '../../components';
import { IHeaderStateProps } from "./IHeaderStateProps"
import { actionAddBoat } from '../../store/actions/index';
import { IBoat } from '../../models';



const mapStateToProps = ({ boats }: IRootReducer): IHeaderStateProps => ({
  boats
});

const mapDispatchToProps = (dispatch: Dispatch<Action>): IHeaderDispatchProps => ({
  addBoat: (boat: IBoat) => dispatch(actionAddBoat(boat)),
});

 export const HeaderContainer =  connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
