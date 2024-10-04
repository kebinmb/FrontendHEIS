import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserInstitutionState } from "./institution-users.reducer";

export const selectUserInstitutionState = createFeatureSelector<UserInstitutionState>('userInstitution');

export const selectUserInstitutionList = createSelector(
    selectUserInstitutionState,
    (state:UserInstitutionState)=> state.userInstitutionList
);

export const selectUserInstitutionListLoading = createSelector(
    selectUserInstitutionState,
    (state:UserInstitutionState)=>state.loading
);

export const selectUserInstitutionListFailure = createSelector(
    selectUserInstitutionState,
    (state:UserInstitutionState)=>state.error
);