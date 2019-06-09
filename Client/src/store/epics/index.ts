import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import { FETCH_BOATS_LIST } from '../constants';
import { IBoat } from '../../models';
import { getBoatListRoute } from '../../utils';
import { actionSetWishlistProducts } from '../actions';


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
    map(({data: boatsListResponce}: {data: IBoat[]}) => actionSetWishlistProducts(boatsListResponce))
  );

 export const rootEpics = combineEpics(FetchBoatsEpic);
