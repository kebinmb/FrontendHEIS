import {createAction,props} from '@ngrx/store';

export const loadMonthlyReports = createAction(
    '[Monthly Reports] Load Monthly Reports',
    props <{month:string,year:string}>()
);

export const loadMonthlyReportsSuccess=createAction(
    '[Monthly Reports] Load Monthly Reports Success',
    props<{monthlyReports:any[]}>()
);

export const loadMonthlyReportsFailure = createAction(
    '[Monthly Reports] Load Monthly Reports Failed',
    props<{error:any}>()
);




