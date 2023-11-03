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
import { ModalProps } from "../Type/ModalPropsType";
import { UserControllProps } from "../Type/UserType";


export function AdminPage (props: UserControllProps){

    const Sock = new SockJS(SERVER_URL+'/ws');
    const stompClient = over(Sock);

    const modalDomElement = document.getElementById("portal-root");

    const [stateModal, setStateModal] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("You have no permission!!!")

    const [adminNameField, setAdminNameField] = useState<string>('');

    const openModal = () => setStateModal(true);
    const closeModal = () => setStateModal(false);

    const navigate = useNavigate()

    const modalProps: ModalProps ={message: message, setMessage: setMessage, open: openModal, close: closeModal}


    const connect =()=>{
        stompClient.connect({}, onConnected, onError);
    }



    const onConnected: (frame?: Frame | undefined) => any = () => {
        if(stompClient){
            stompClient.subscribe('/queue/notify', onMessageReceived);
        }
    }


    const onMessageReceived = (payload: Message)=>{
        const [serverEvent, receiver] = payload.body;
        console.log(payload.body["receiver"])
        function logoutAndRedirect() {
            apiService.logout()
                .then(() => {
                    navigate("../",{replace: true})
                })
                .catch((error)=>{console.error("Error:", error)})
        }
        if(payload.body){
            setMessage("Will be logout in 5 seconds")
            openModal()
        const delayInMilliseconds = 5000;

        setTimeout(logoutAndRedirect, delayInMilliseconds);
        }
        
    }

    const onError: (error: string | Frame) => any = (err: string | Frame) => {
        console.error(err);
    }

    const sendMessageToNewAdmin = () => {
        stompClient.send("/app/announce",{},adminNameField)
    }


    useEffect(()=>{connect()},[])


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