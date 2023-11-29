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
import { useSelector } from "react-redux";
import {stateRedux } from "../Type/ReduxTypes";
import { WebSocketMessageType } from "../Type/WebSocketMessageType";
import { AdminPageProps } from "../Type/AdminPagePropsType";


export function AdminPage (){

    //MODAL

    const modalDomElement = document.getElementById("portal-root");

    const [stateModal, setStateModal] = useState<boolean>(false);
    const [modalMessage, setModalMessage] = useState<string>("Please wait ...")



    const openModal = () => setStateModal(true);
    const closeModal = () => setStateModal(false);

    const modalProps: NotificationModalProps ={message: {value: modalMessage, setValue: setModalMessage}, open: openModal, close: closeModal, isOpen: stateModal}

    

    //REDUX SAGA

    const user = useSelector((state: stateRedux) =>state.userReducer.user)

    //WEB SOCKET 
    const navigate = useNavigate()

    const Sock = new SockJS(SERVER_WEBSOCKET_URL+'/ws');
    const stompClient = over(Sock);

    const connect =()=>{
        stompClient.connect({}, onConnected, onError);
    }



    const onConnected: (frame?: Frame | undefined) => any = () => {
        if(stompClient){
            stompClient.subscribe('/queue/notify', onMessageReceived);
        }
    }


    const onMessageReceived = (payload: Message)=>{

        function logoutAndRedirect() {
            apiService.logout()
                .then(() => {
                    navigate("../",{replace: true})
                })
                .catch((error)=>{console.error("Error:", error)})
        }

        if (payload.body) {
            const messageData: WebSocketMessageType = JSON.parse(payload.body);
            if (messageData.receiver === user.login) {
                setModalMessage("Will be logout in 5 seconds")
                openModal()
                const delayInMilliseconds = 1000 * 5;

                setTimeout(logoutAndRedirect, delayInMilliseconds);
            } 
        }
       
    }

    const onError: (error: string | Frame) => any = (err: string | Frame) => {
        console.error(err);
    }

    const sendMessageToNewAdmin = (adminName: string) => {
        stompClient.send("/app/announce",{},adminName)
    }

    useEffect(()=>{
        connect()
    },[])

    const adminPageProps: AdminPageProps = {modalProps, sendMessageToNewAdmin: sendMessageToNewAdmin }

    return(
    <div>
        <Header/>
        {stateModal && modalDomElement &&
                    createPortal(
                        <Modal {... modalProps}/>,
                        modalDomElement
                    )
        }
        <SetAdminRoleForm {...adminPageProps}/>
        <Footer/>
    </div>
    )
    
}