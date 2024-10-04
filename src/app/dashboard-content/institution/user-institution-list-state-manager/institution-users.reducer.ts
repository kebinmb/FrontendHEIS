import { createReducer, on } from "@ngrx/store";
import { loadUserInstitutionList,loadUserInstitutionListFailure,loadUserInstitutionListSuccess } from "./institution-users.actions";

export interface UserInstitutionState{
    userInstitutionList:any[];
    loading:boolean;
    error:any;
}

export const initialState:UserInstitutionState = {
    userInstitutionList:[],
    loading:false,
    error:null
};

const _userInstitutionReducer = createReducer(
    initialState,
    on(loadUserInstitutionList,state=>({
        ...state,
        loading:false,
        error:null
    })),
    on(loadUserInstitutionListSuccess,(state,{userInstitutionList})=>
    ({
        ...state,
        userInstitutionList,
        loading:false
    })),
    on(loadUserInstitutionListFailure,(state,{error})=>
    ({
        ...state,
        error,
        loading:false
    }))
);

export function userInstitutionReducer(state:any,action:any){
    return _userInstitutionReducer(state,action);
}