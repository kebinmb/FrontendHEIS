import { createReducer,on } from "@ngrx/store";
import { loadMonthlyReports,loadMonthlyReportsFailure,loadMonthlyReportsSuccess } from "./monthly-reports.actions";


export interface MonthlyReportsState{
    monthlyReports:any[];
    loading:boolean;
    error:any;
}

export const initialState:MonthlyReportsState = {
    monthlyReports:[],
    loading:false,
    error:null
};

const _monthlyReportsReducer = createReducer(
    initialState,
    on(loadMonthlyReports,state=>({
        ...state,
        loading:true,
        error:null
    })),
    on(loadMonthlyReportsSuccess,(state,{monthlyReports})=>({
        ...state,
        loading:false,
        monthlyReports
    })),
    on(loadMonthlyReportsFailure,(state,{error})=>({
        ...state,
        loading:false,
        error
    }))

);

export function monthlyReportsReducer(state:any,action:any){
    return _monthlyReportsReducer(state,action);
}