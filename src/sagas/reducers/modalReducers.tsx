import { createReducer } from "@reduxjs/toolkit";
import { ModalRootState } from "../../Type/ReduxTypes";
import { openModalWithNewMessage } from "../actions";


const initialState: ModalRootState = {
    message: "GOD BLESS YOU"
}

const modalReducer = createReducer(initialState, (builder)=>{
    builder
        .addCase(openModalWithNewMessage, (state, action)=>{state.message= action.payload})
})

export default modalReducer;