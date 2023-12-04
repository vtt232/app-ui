import { Footer } from "../Component/Layout/Footer";
import { Header } from "../Component/Layout/Header";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Modal from "../Component/Modal/Modal";
import { SetAdminRoleForm } from "../Component/SetAdminRoleForm";
import SockJS from 'sockjs-client'
import { Client, Frame, Message } from 'stompjs';
import {over} from 'stompjs'
import { SERVER_WEBSOCKET_URL } from '../Constant/Constant';
import { useNavigate} from "react-router-dom";
import apiService from '../ApiCaller/ApiCaller'; 
import {NotificationModalProps } from "../Type/ModalPropsType";
import { useDispatch, useSelector } from "react-redux";
import {stateRedux } from "../Type/ReduxTypes";
import { WebSocketMessageType } from "../Type/WebSocketMessageType";
import { AdminPageProps } from "../Type/AdminPagePropsType";
import { ModalLayout } from "../Component/Layout/Modal,Layout";


export function AdminPage (){

    
    return(
    <div>
        <Header/>
        <ModalLayout/>
        <SetAdminRoleForm/>
        <Footer/>
    </div>
    )
    
}