import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stateRedux } from "../../Type/ReduxTypes";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import { Frame, Message, over } from "stompjs";
import apiService from '../../ApiCaller/ApiCaller';
import { SERVER_WEBSOCKET_URL } from "../../Constant/Constant";
import { WebSocketMessageType } from "../../Type/WebSocketMessageType";
import { createPortal } from "react-dom";
import Modal from "../Modal/Modal";
import { NotificationModalProps } from "../../Type/ModalPropsType";
import { openModalWithNewMessage } from "../../sagas/actions";

export function ModalLayout () {
    //MODAL

    const modalDomElement = document.getElementById("portal-root");

    const [stateModal, setStateModal] = useState<boolean>(false);

    const modalReducer = useSelector((state: stateRedux) =>state.modalReducer)

    const dispatch = useDispatch()


    const openModal = () => setStateModal(true);
    const closeModal = () => setStateModal(false);

    const modalProps: NotificationModalProps ={message: modalReducer.message, open: openModal, close: closeModal, isOpen: stateModal}

    

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
            
            if (messageData.receiver === user.login && messageData.serverEvent === "EVENT_SET_ADMIN") {
                dispatch(openModalWithNewMessage("Will be logout in 5 seconds"))
                openModal()
                const delayInMilliseconds = 1000 * 5;

                setTimeout(logoutAndRedirect, delayInMilliseconds);
            } 
        }
       
    }

    const onError: (error: string | Frame) => any = (err: string | Frame) => {
        console.error(err);
    }


    useEffect(()=>{
        connect()
    },[])

    return (<div>
        {stateModal && modalDomElement &&
                    createPortal(
                        <Modal {... modalProps}/>,
                        modalDomElement
                    )
        }
    </div>)
}