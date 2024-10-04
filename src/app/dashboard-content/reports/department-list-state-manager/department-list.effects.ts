import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ReportsService } from "../reports.service";
import { catchError, map, mergeMap, of } from "rxjs";
import { loadDepartmentList, loadDepartmentListSuccess } from "./department-list.actions";
import { loadUserListFailure } from "../daily-reports-state-manager/daily-report.actions";

@Injectable()
export class DepartmentEffects{
    loadDepartmentList$ = createEffect(()=>
    this.actions$.pipe(
        ofType(loadDepartmentList),
        mergeMap(()=>
        this.reportsService.getDepartmentDetails().pipe(
            map(departmentList=>{
                // ////console.log('Fetched Department List:',departmentList);
                return loadDepartmentListSuccess({departmentList});
            }),
            catchError(error=>{
                console.error('Error fetching department list.',error);
                return of(loadUserListFailure({error}));
            })
        ))
    ))


    constructor(
        private actions$:Actions,
        private reportsService:ReportsService
    ){}
}


