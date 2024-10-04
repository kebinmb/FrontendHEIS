import { createReducer, on } from "@ngrx/store";
import { loadUserNames,loadUserNamesFailure,loadUserNamesSuccess, updateFinalDailyReports } from '../user-name-state-manager/userName.actions';

export interface UserNameState{
    userNames:any[];
    finalDailyReports: any[];
    loading:boolean;
    error:any;
}

export const initialState:UserNameState = {
    userNames:[],
    finalDailyReports: [],
    loading:false,
    error:null
};

const _userNamesReducer = createReducer(
    initialState,
    on(loadUserNames,state=>({
        ...state,
        loading:true,
        error:null
    })),

    on(loadUserNamesSuccess,(state,{userNames})=>({
        ...state,
        userNames,
        loading:false
    })),
    on(loadUserNamesFailure,(state,{error})=>({
        ...state,
        error,
        loading:false
    })),
    on(updateFinalDailyReports, (state, { finalDailyReports }) => ({
        ...state,
        finalDailyReports
      }))
    );

export function userNamesReducer(state:any,action:any){
    return _userNamesReducer(state,action);
}