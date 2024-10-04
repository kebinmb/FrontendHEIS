import { createReducer, on } from "@ngrx/store";
import { loadInstutionList,loadInstutionListFailure,loadInstutionListSuccess } from "./department-list.actions";

export interface InstitutionState{
    institutionList:any[];
    loading:boolean;
    error:any;
}

export const initialState:InstitutionState = {
    institutionList:[],
    loading:false,
    error:null
}

const _institutionReducer = createReducer(
    initialState,
    on(loadInstutionList,state=>({
        ...state,
        loading:true,
        error:null
    })),
    on(loadInstutionListSuccess,(state,{institutionList})=>({
        ...state,
        institutionList,
        loading:false
    })),
    on(loadInstutionListFailure,(state,{error})=>({
        ...state,
        loading:false,
        error
    })),
)

export function institutionReducer(state:any,action:any){
    return _institutionReducer(state,action);
}