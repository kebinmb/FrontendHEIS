import { Injectable } from "@angular/core";
import { loadUserInstitutionList, loadUserInstitutionListFailure, loadUserInstitutionListSuccess } from './institution-users.actions';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { InstitutionService } from "../institution.service";
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable()
export class UserInstitutionEffects{
    loadUserInstitutionList$ = createEffect(()=>
    this.actions$.pipe(
        ofType(loadUserInstitutionList),
        mergeMap(()=>
        this.institutionService.getUserList().pipe(
            map(userInstitutionList=>{
                // ////console.log('Users from Institutions Effects:',userInstitutionList);
                return loadUserInstitutionListSuccess({userInstitutionList});
            }),
            catchError(error=>{
                console.error('Error fetching user list in institution effects',error);
                return of(loadUserInstitutionListFailure({error}));
            })
        ))
    ))

    constructor(private actions$:Actions,  private institutionService:InstitutionService)
    {
       
    }
}