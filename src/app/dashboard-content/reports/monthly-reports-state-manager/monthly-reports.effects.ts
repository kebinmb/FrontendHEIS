import { Injectable } from "@angular/core";
import { loadMonthlyReports,loadMonthlyReportsFailure,loadMonthlyReportsSuccess } from "./monthly-reports.actions";
import { Actions,ofType,createEffect } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { ReportsService } from "../reports.service";
import * as CryptoJS from "crypto-js";
@Injectable()
export class MonthlyReportsEffects{
    constructor(
        private actions$: Actions,
        private reportsService: ReportsService
      ) {}
      loadMonthlyReports$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadMonthlyReports),
            mergeMap(action => {
                const encryptedName = sessionStorage.getItem('username');
                let decryptedName = '';
                if (encryptedName) {
                    const bytes = CryptoJS.AES.decrypt(encryptedName, 'chmsu.edu.ph.secret-key.secret');
                    decryptedName = bytes.toString(CryptoJS.enc.Utf8);
                }
    
                return this.reportsService.getMonthlyReports(action.month, action.year,decryptedName).pipe(
                    map(monthlyReports => {
                        if (!Array.isArray(monthlyReports)) {
                            throw new Error('Expected an array of Monthly Reports');
                        }
    
                        const validMonthlyReports = monthlyReports
                            .filter((report: any) => report && report.documentNumber)
                            .map((report: any) => ({ ...report }));

                        
                        //console.log(validMonthlyReports);
    
                        return loadMonthlyReportsSuccess({ monthlyReports: validMonthlyReports });
                    }),
                    catchError(error => of(loadMonthlyReportsFailure({ error })))
                );
            })
        )
    );
}