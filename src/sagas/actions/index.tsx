import { createAction } from "@reduxjs/toolkit"
import { User } from "../../Type/UserType"




export const requestUserInfor = createAction('User_Request')
export const requestUserInforSuccess = createAction<User>('User_RequestSuccess')
export const requestUserInforFailed = createAction<string>('User_RequestFailed')

export const openModalWithNewMessage = createAction<string>('Open_Modal')

