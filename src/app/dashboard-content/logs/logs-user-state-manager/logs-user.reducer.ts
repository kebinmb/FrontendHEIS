import { createReducer, on } from "@ngrx/store";
import { loadUserLogsList, loadUserLogsListFailure,loadUserLogsListSuccess } from "./logs-user.actions";

export interface UserLogsState{
    userLogsList:any[];
    loading:boolean;
    error:any;
}

export const initialState:UserLogsState = {
    userLogsList:[],
    loading:false,
    error:null
};

const _userLogsReducer = createReducer(
    initialState,
    on(loadUserLogsList,state=>({
        ...state,
        loading:false,
        error:null
    })),
    on(loadUserLogsListSuccess,(state,{userLogsList})=>({
        ...state,
        userLogsList,
        loading:false
    })),
    on(loadUserLogsListFailure,(state,{error})=>({
        ...state,
        error,
        loading:false
    }))
);

export function userLogsReducer(state:any,action:any){
    return _userLogsReducer(state,action);
}