import { createSelector, createFeatureSelector } from '@ngrx/store';
import { InstitutionState } from './department-list.reducer';

export const selectInstitutionState = createFeatureSelector<InstitutionState>('institution');

export const selectInstitutionList = createSelector(
    selectInstitutionState,
    (state:InstitutionState)=>state.institutionList
);

export const selectInstitutionLoading = createSelector(
    selectInstitutionState,
    (state:InstitutionState)=>state.loading
);

export const selectInstitutionError = createSelector(
    selectInstitutionState,
    (state:InstitutionState)=>state.error
);