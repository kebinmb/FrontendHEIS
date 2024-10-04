import { createReducer,on } from "@ngrx/store";
import
{
    loadDepartmentList,
    loadDepartmentListSuccess,
    loadDepartmentListFailure
} from './department-list.actions';

export interface DepartmentState{
    departmentList:any[];
    loading:boolean;
    error:any;
}

export const initialState:DepartmentState = {
    departmentList:[],
    loading:false,
    error:null
};

const _departmentReducer = createReducer(
    initialState,
    on(loadDepartmentList,state=>({
        ...state,
        loading:true,
        error:null
    })),
    on(loadDepartmentListSuccess,(state,{departmentList})=>({
        ...state,
        departmentList,
        loading:false
    })),
    on(loadDepartmentListFailure,(state,{error})=>({
        ...state,
        error,
        loading:false
    }))
);

export function departmentReducer(state:any,action:any){
    return _departmentReducer(state,action);
}