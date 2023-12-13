import { createAction } from "@reduxjs/toolkit"
import { User } from "../../Type/UserType"




export const requestUserInfor = createAction('User_Request')
export const requestUserInforSuccess = createAction<User>('User_RequestSuccess')
export const requestUserInforFailed = createAction<string>('User_RequestFailed')

export const setNewMessage = createAction<string>('Set_Message_Modal')
export const openModal = createAction('Open_Modal')
export const closeModal = createAction('Close_Modal')

