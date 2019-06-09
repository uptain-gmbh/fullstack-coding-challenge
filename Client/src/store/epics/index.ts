import { IBoat, IAction } from './../../models';
import { of } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { catchError, map, switchMap } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import { FETCH_BOATS_LIST, ADD_BOAT } from '../constants';
import { getBoatListRoute, getAddBoatRoute } from '../../utils';
import { actionSetBoats, actioAddBoatToLocalList } from '../actions';


 const FetchBoatsEpic = (action$: any) =>
 action$.pipe(
    ofType(FETCH_BOATS_LIST),
    switchMap(() => 
       ajax.getJSON<IBoat>(getBoatListRoute())
    ),
    catchError(err => {
      console.error(`[FETCH-BOOKS-EPICS-ERROR] : ${err}`);
      return of({ data:[]});
    }),
    map(({data: boatsListResponce}: {data: IBoat[]}) => actionSetBoats(boatsListResponce))
  );

  const AddBoatEpic = (action$: any) =>
  action$.pipe(
     ofType(ADD_BOAT),
     switchMap(({payload: boat}) => 
        ajax.post(getAddBoatRoute(), boat)
     ),
     catchError(err => {
       console.error(`[FETCH-BOOKS-EPICS-ERROR] : ${err}`);
       return of({ data:{}});
     }),
     map<AjaxResponse, IAction<IBoat>>(({response:{data}}) => actioAddBoatToLocalList(data))
   );


 export const rootEpics = combineEpics(FetchBoatsEpic, AddBoatEpic);
