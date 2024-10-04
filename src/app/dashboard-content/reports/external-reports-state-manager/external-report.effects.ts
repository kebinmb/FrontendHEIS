import { Injectable } from "@angular/core";
import { loadExternalReports, loadExternalReportsSuccess, loadExternalreportsFailure } from './external-report.actions';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ReportsService } from "../reports.service";
import { map, mergeMap } from "rxjs";
import * as CryptoJS from "crypto-js";
@Injectable()
export class ExternalReportsEffects{
    constructor(private actions$:Actions, private reportsService:ReportsService){}
    loadExternalReports$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadExternalReports),
            mergeMap(action => {
                const encryptedName = sessionStorage.getItem('username');
                let decryptedName = '';
                if (encryptedName) {
                    const bytes = CryptoJS.AES.decrypt(encryptedName, 'chmsu.edu.ph.secret-key.secret');
                    decryptedName = bytes.toString(CryptoJS.enc.Utf8);
                }
    
                return this.reportsService.getExternalReports(action.month, action.year,decryptedName).pipe(
                    map(externalReports => {
                        if (!Array.isArray(externalReports)) {
                            throw new Error('Expected an array of external reports');
                        }
                        const validExternalReports = externalReports
                            .filter((report: any) => report && report.documentNumber)
                            .map((report: any) => ({ ...report }));
                        // ////console.log('Valid external Reports:', validExternalReports);
                        return loadExternalReportsSuccess({ externalReports: validExternalReports });
                    }),
                );
            })
        )
    );

    
}