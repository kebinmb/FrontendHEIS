import {createReducer, on} from '@ngrx/store';
import{
    loadDailyReports,
    loadDailyReportsSuccess,
    loadDailyReportsFailure,
    loadUserList,
    loadUserListSuccess,
    loadUserListFailure
} from '../daily-reports-state-manager/daily-report.actions'


export interface DailyReportState{
    reports:any[];
    loading:boolean;
    error:any;
}

export const initialState:DailyReportState = {
    reports:[],
    loading:false,
    error:null
};

const _dailyReportReducer = createReducer(
    initialState,
    on(loadDailyReports, state=>({
        ...state,
        loading:true,
        error:null
    })),
    on(loadDailyReportsSuccess,(state,{reports})=>({
        ...state,
        loading:false,
        reports
    })),
    on(loadDailyReportsFailure,(state,{error})=>({
        ...state,
        loading:false,
        error
    }))
);

const _userListReducer=createReducer(
    initialState,
    on(loadUserList,state=>({
        ...state,
        loading:true,
        error:null
    })),
    on(loadUserListSuccess,(state,{userList})=>({
        ...state,
        loading:false,
        userList
    })),
    on(loadUserListFailure,(state,{error})=>({
        ...state,
        loading:false,
        error
    }))
);

export function dailyReportReducer(state:any,action:any){
    return _dailyReportReducer(state,action);
}

export function userListReducer(state:any,action:any){
    return _userListReducer(state,action);
}