import { createFeatureSelector,createSelector } from "@ngrx/store";
import { DepartmentNamesState } from "./departmentname.reducer";

export const selectDepartmentNameState = createFeatureSelector<DepartmentNamesState>('departmentNames');

export const selectDepartmentName = createSelector(
    selectDepartmentNameState,
    (state:DepartmentNamesState)=>state.departmentNames
);

export const selectDepartmentNameLoading = createSelector(
    selectDepartmentNameState,
    (state:DepartmentNamesState)=>state.loading
);

export const selectDepartmentNameError = createSelector(
    selectDepartmentNameState,
    (state:DepartmentNamesState)=>state.error
);

export const selectFinalMonthlyReports = createSelector(
    selectDepartmentNameState,
    (state:DepartmentNamesState)=>state.finalMonthlyReports
);