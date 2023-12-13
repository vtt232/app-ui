import { createReducer } from "@reduxjs/toolkit";
import { ModalRootState } from "../../Type/ReduxTypes";
import { closeModal, openModal, setNewMessage } from "../actions";


const initialState: ModalRootState = {
    message: "GOD BLESS YOU",
    openStatus: false
}

const modalReducer = createReducer(initialState, (builder)=>{
    builder
        .addCase(setNewMessage, (state, action)=>{state.message= action.payload})
        .addCase(openModal, (state) => {state.openStatus = true})
        .addCase(closeModal, (state) => {state.message= ""; state.openStatus = false })
})

export default modalReducer;