import { createFeatureSelector,createSelector } from "@ngrx/store";
import { DepartmentState } from "./department-list.reducer";

export const selectDepartmentState = createFeatureSelector<DepartmentState>('department');

export const selectDepartmentList = createSelector(
    selectDepartmentState,
    (state:DepartmentState)=> state.departmentList
);

export const selectDepartmentLoading = createSelector(
    selectDepartmentState,
    (state:DepartmentState)=> state.loading
);

export const selectDepartmentError = createSelector(
    selectDepartmentState,
    (state:DepartmentState)=> state.error
)