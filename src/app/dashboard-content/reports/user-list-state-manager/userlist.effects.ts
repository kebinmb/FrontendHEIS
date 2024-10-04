import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ReportsService } from '../reports.service';
import {
  loadUserList,
  loadUserListSuccess,
  loadUserListFailure
} from './userlist.actions';

@Injectable()
export class UserEffects {
  loadUserList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserList),
      mergeMap(() =>
        this.reportsService.getUserList().pipe(
          map(userList => {
            // ////console.log('Fetched User List:', userList); // For debugging
            return loadUserListSuccess({ userList });
          }),
          catchError(error => {
            console.error('Error fetching user list.', error); // For debugging
            return of(loadUserListFailure({ error }));
          })
        )
      )
    )
  );


  constructor(
    private actions$: Actions,
    private reportsService: ReportsService
  ) {}


  
}
