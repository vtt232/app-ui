import { createReducer } from "@reduxjs/toolkit"
import {requestUserInfor, requestUserInforSuccess, requestUserInforFailed} from "../actions/index"
import { UserRootState } from "../../Type/ReduxTypes"

const initialState: UserRootState = {
    user: {login: "", url: ""},
    loading: false,
    error: null
}




const userReducer = createReducer(initialState, (builder)=>{
    builder
        .addCase(requestUserInfor, (state)=>{state.loading= true})
        .addCase(requestUserInforSuccess, (state,action)=>{state.loading=false; state.user=action.payload})
        .addCase(requestUserInforFailed, (state,action)=>{state.loading=false; state.error=action.payload})
})

export default userReducer;