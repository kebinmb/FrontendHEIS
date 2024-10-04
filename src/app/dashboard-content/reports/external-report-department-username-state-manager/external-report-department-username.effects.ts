import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ReportsService } from "../reports.service";
import { loadDepartmentUserNames, loadDepartmentUserNamesFailure, updateFinalExternalReports } from "./external-report-department-username.actions";
import { catchError, forkJoin, map, mergeMap, of } from "rxjs";

@Injectable()
export class DepartmentUserNameEffects {
    constructor(private actions$: Actions, private reportsService: ReportsService) {}

    loadDepartmentUserNames$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadDepartmentUserNames),
            mergeMap((action) =>
                forkJoin({
                    departmentList: this.reportsService.getDepartmentDetails(),
                    userList: this.reportsService.getUserList()
                }).pipe(
                    map(({ departmentList, userList }) => {
                        // ////console.log('Fetched Department List from External Reports:', departmentList);
                        // ////console.log('Fetched User List from External Reports:', userList);

                        const departmentNames = departmentList
                            .filter((department: any) =>
                                action.externalMonthlyReportsArray.some(
                                    (externalMonthlyReports: any) =>
                                        externalMonthlyReports.departmentId === department.departmentId
                                )
                            )
                            .map((department: any) => ({
                                departmentId: department.departmentId,
                                departmentName: department.departmentTitle,
                            }));

                        const userMap = new Map<string, string>(
                            userList.map((user: any) => [user.userId.toString(), user.name])
                        );

                        const finalExternalMonthlyReports = action.externalMonthlyReportsArray.map(
                            (externalMonthlyReports: any) => {
                                const matchedDepartment = departmentNames.find(
                                    (department) =>
                                        externalMonthlyReports.departmentId === department.departmentId
                                );
                                
                                // const receiverName = userMap.get(externalMonthlyReports.attention) || '';
                                const receiverNames = externalMonthlyReports.attention.toString()
                                .split(',')
                                .map((userId: string) => userMap.get(userId.trim()) || '')
                                .filter((name:any) => name !== '')  // Filter out any empty names
                                .join(', ');
                                return {
                                    ...externalMonthlyReports,
                                    departmentName: matchedDepartment ? matchedDepartment.departmentName : '',
                                    receiverNames:receiverNames
                                };
                            }
                        );
                        // ////console.log('Final External Monthly Reports Array with Receivers:', finalExternalMonthlyReports);
                        return updateFinalExternalReports({ finalExternalMonthlyReports });
                    }),
                    catchError((error) => {
                        console.error('Error processing external reports:', error);
                        return of(loadDepartmentUserNamesFailure({ error }));
                    })
                )
            )
        )
    );
}
