import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ReportsService } from "../reports.service";
import { loadDepartmentNames, loadDepartmentNamesFailure, updateFinalMonthlyReports } from "./departmentname.actions";
import { catchError, map, mergeMap } from "rxjs/operators";
import { forkJoin, of } from "rxjs";

@Injectable()
export class DepartmentNamesEffect {
  constructor(
    private actions$: Actions,
    private reportsService: ReportsService
  ) {}

  loadDepartmentNames$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDepartmentNames),
      mergeMap((action) =>
        // Use forkJoin to wait for both service calls to complete
        forkJoin({
          departmentList: this.reportsService.getDepartmentDetails(),
          userList: this.reportsService.getUserList()
        }).pipe(
          map(({ departmentList, userList }) => {
            // ////console.log('Fetched Department List:', departmentList);
            // ////console.log('User List From Department Effects:', userList);

            // Filter and map department names
            const departmentNames = departmentList
              .filter((department: any) =>
                action.monthlyReportsArray.some(
                  (monthlyReport: any) =>
                    monthlyReport.departmentId === department.departmentId
                )
              )
              .map((department: any) => ({
                departmentId: department.departmentId,
                departmentName: department.departmentTitle,
              }));

            // Create a map for user IDs to names for quick lookup
            const userMap = new Map<string, string>(
              userList.map((user: any) => [user.userId.toString(), user.name])
            );

            // Update finalMonthlyReportsArray with department names and receiver names
            const finalMonthlyReports = action.monthlyReportsArray.map(
              (monthlyReport: any) => {
                const matchedDepartment = departmentNames.find(
                  (department) =>
                    monthlyReport.departmentId === department.departmentId
                );
                 // Handle comma-separated user IDs in the attention field
                 const receiverNames = monthlyReport.attention
                 .split(',')
                 .map((userId: string) => userMap.get(userId.trim()) || '')
                 .filter((name:any) => name !== '')  // Filter out any empty names
                 .join(', ');

               return {
                 ...monthlyReport,
                 departmentName: matchedDepartment ? matchedDepartment.departmentName : '',
                 receiverName: receiverNames
               };
              }
            );

            // ////console.log('Final Monthly Reports Array with Receivers:', finalMonthlyReports);

            return updateFinalMonthlyReports({ finalMonthlyReports });
          }),
          catchError((error) => {
            console.error('Error processing department names:', error);
            return of(loadDepartmentNamesFailure({ error }));
          })
        )
      )
    )
  );
}
