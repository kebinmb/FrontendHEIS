import { Injectable } from "@angular/core";
import { loadUserLogsList, loadUserLogsListFailure, loadUserLogsListSuccess } from './logs-user.actions';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { LogsService } from "../logs.service";
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable()
export class UserLogsEffects{
    loadUserLogsList$ = createEffect(()=>
    this.action$.pipe(
        ofType(loadUserLogsList),
        mergeMap(()=>
        this.logsService.getUserList().pipe(
            map(userLogsList=>{
                // ////console.log('User from Logs Effects:',userLogsList);
                return loadUserLogsListSuccess({userLogsList});
            }),
            catchError(error=>{
                console.error('Error fetching user list in logs effects',error);
                return of(loadUserLogsListFailure({error}));
            })
        ))
    ))

    constructor(private action$:Actions,private logsService:LogsService){}
}