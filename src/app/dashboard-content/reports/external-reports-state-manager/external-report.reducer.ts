import { createReducer,on } from "@ngrx/store";
import { loadExternalReports,loadExternalReportsSuccess,loadExternalreportsFailure,loadUserList,loadUserListFailure,loadUserListSuccess } from "./external-report.actions";



export interface ExternalMonthlyReportState{
    externalReports:any[];
    loading:boolean;
    error:any;
}

export const initialState:ExternalMonthlyReportState = {
    externalReports:[],
    loading:false,
    error:null
};

const _externalReportReducer = createReducer(
    initialState,
    on(loadExternalReports,state=>({
        ...state,
        loading:true,
        error:null
    })),
    on(loadExternalReportsSuccess,(state,{externalReports})=>({
        ...state,
        loading:false,
        externalReports
    })),
    on(loadExternalreportsFailure,(state,{error})=>({
        ...state,
        loading:false,
        error
    }))
);

const _userListReducer = createReducer(
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

export function externalReportReducer(state:any,action:any){
    return _externalReportReducer(state,action);
}

export function userListReducer(state:any,action:any){
    return _userListReducer(state,action);
}