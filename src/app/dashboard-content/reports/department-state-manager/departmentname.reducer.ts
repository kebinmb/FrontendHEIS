import { createReducer,on} from "@ngrx/store";
import { loadDepartmentNames,loadDepartmentNamesFailure,loadDepartmentNamesSuccess, loadUserList, loadUserListFailure, loadUserListSuccess, updateFinalMonthlyReports } from "./departmentname.actions";

export interface DepartmentNamesState{
    departmentNames:any[];
    finalMonthlyReports:any[];
    loading:boolean;
    error:any;
}

export const initialState:DepartmentNamesState = {
    departmentNames:[],
    finalMonthlyReports: [],
    loading:false,
    error:null
};

const _departmentNamesReducer = createReducer(
    initialState,
    on(loadDepartmentNames,state=>({
        ...state,
        loading:true,
        error:null
    })),

    on(loadDepartmentNamesSuccess,(state,{departmentNames})=>({
        ...state,
        departmentNames,
        loading:false
    })),
    on(loadDepartmentNamesFailure,(state,{error})=>({
        ...state,
        error,
        loading:false
    })),
    on(updateFinalMonthlyReports,(state,{finalMonthlyReports})=>({
        ...state,
        finalMonthlyReports
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

export function departmentNamesReducer(state:any,action:any){
    return _departmentNamesReducer(state,action);
}

export function userListReducer(state:any,action:any){
    return _userListReducer(state,action);
}