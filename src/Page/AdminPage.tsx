import { Footer } from "../Component/Layout/Footer";
import { Header } from "../Component/Layout/Header";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Modal from "../Component/Modal/Modal";
import { SetAdminRoleForm } from "../Component/SetAdminRoleForm";
import SockJS from 'sockjs-client'
import { Client, Frame, Message } from 'stompjs';
import {over} from 'stompjs'
import { SERVER_URL } from '../Constant/Constant';
import { useNavigate} from "react-router-dom";
import apiService from '../ApiCaller/ApiCaller'; 
import {ModalProps } from "../Type/ModalPropsType";
import { useDispatch, useSelector } from "react-redux";
import { requestUserInfor } from "../sagas/actions";
import {stateRedux } from "../Type/ReduxTypes";
import { WebSocketMessageType } from "../Type/WebSocketMessageType";


export function AdminPage (){

    //REDUX SAGA

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(requestUserInfor())
    },[dispatch])

    const user = useSelector((state: stateRedux) =>state.userReducer.user)

    //WEB SOCKET 
    const navigate = useNavigate()

    const Sock = new SockJS(SERVER_URL+'/ws');
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
                setMessage("Will be logout in 5 seconds")
                openModal()
                const delayInMilliseconds = 5000;

                setTimeout(logoutAndRedirect, delayInMilliseconds);
            } 
        }
       
    }

    const onError: (error: string | Frame) => any = (err: string | Frame) => {
        console.error(err);
    }

    const sendMessageToNewAdmin = () => {
        stompClient.send("/app/announce",{},adminNameField)
    }

    useEffect(()=>{
        connect()
    },[])


    //MODAL

    const modalDomElement = document.getElementById("portal-root");

    const [stateModal, setStateModal] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("You have no permission!!!")

    const [adminNameField, setAdminNameField] = useState<string>('');

    const openModal = () => setStateModal(true);
    const closeModal = () => setStateModal(false);

    const modalProps: ModalProps ={message: message, setMessage: setMessage, open: openModal, close: closeModal}


    return(
    <div>
        <Header/>
        {stateModal && modalDomElement &&
                    createPortal(
                        <Modal message={message} close={closeModal} open={openModal} setMessage={setMessage}/>,
                        modalDomElement
                    )
        }
        <SetAdminRoleForm sendMessageToNewAdmin={sendMessageToNewAdmin} adminNameField={adminNameField} setAdminNameField={setAdminNameField} modalProps={modalProps}/>
        <Footer/>
    </div>
    )
    
}