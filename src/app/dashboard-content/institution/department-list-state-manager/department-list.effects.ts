import { Injectable } from "@angular/core";

import { Actions, createEffect, ofType } from "@ngrx/effects";
import { InstitutionService } from "../institution.service";
import { catchError, map, mergeMap, of } from "rxjs";
import { loadInstutionList, loadInstutionListFailure, loadInstutionListSuccess } from "./department-list.actions";

@Injectable()

export class InstitutionEffects {
    loadInstutionList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadInstutionList),
            mergeMap(() =>
                this.institutionService.getDepartmentDetails().pipe(
                    map(institutionList => {

                        return loadInstutionListSuccess({ institutionList });
                    }),
                    catchError(error => {

                        return of(loadInstutionListFailure({ error }));
                    })
                ))
        ))


    constructor(private actions$: Actions, private institutionService: InstitutionService) { }
}