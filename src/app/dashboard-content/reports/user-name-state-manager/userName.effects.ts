import { Injectable } from "@angular/core";
import { Actions,createEffect,ofType } from "@ngrx/effects";
import {catchError, map, mergeMap} from 'rxjs/operators';
import { merge, of } from 'rxjs';
import { loadUserNames, loadUserNamesSuccess,loadUserNamesFailure, updateFinalDailyReports } from '../user-name-state-manager/userName.actions';
import { ReportsService } from "../reports.service";




  
  @Injectable()
export class UserNamesEffects {
  loadUserNames$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserNames),
      mergeMap(action =>
        this.reportsService.getUserList().pipe(
          map(userList => {
            // ////console.log('Fetched User List:', userList); // For debugging

            // Extract user names where userId matches any from in dailyReportsArray
            const userNames = userList
              .filter((user: any) => action.dailyReportsArray.some(report => report.from === user.userId.toString()))
              .map((user: any) => ({
                userId: user.userId,
                name: user.name,
                // Add other fields as needed
              }));

            // ////console.log('User Names:', userNames);

            // Update finalDailyReportsArray
            const finalDailyReports = action.dailyReportsArray.map(report => {
              const matchedUser = userNames.find(user => report.from === user.userId.toString());
              return matchedUser ? { ...report, name: matchedUser.name } : report;
            });

            // ////console.log('Final Daily Reports Array:', finalDailyReports);

            // Dispatch actions to update state
            return updateFinalDailyReports({ finalDailyReports });
          }),
          catchError(error => {
            console.error('Error processing user names:', error); // For debugging
            return of(loadUserNamesFailure({ error }));
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



