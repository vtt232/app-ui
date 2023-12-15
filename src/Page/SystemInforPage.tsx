import SockJS from "sockjs-client";
import { Footer } from "../Component/Layout/Footer";
import { Header } from "../Component/Layout/Header";
import { ModalLayout } from "../Component/Layout/ModalLayout";
import { SERVER_WEBSOCKET_URL } from "../Constant/Constant";
import { Frame, Message, over } from "stompjs";
import apiService from '../ApiCaller/ApiCaller';
import { useSelector } from "react-redux";
import { stateRedux } from "../Type/ReduxTypes";
import { SystemInfor } from "../Type/SystemInforType";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { AdminLayout } from "../Component/Layout/AdminLayout";

export function SystemInforPage (){

    //REDUX SAGA

    const user = useSelector((state: stateRedux) =>state.userReducer.user);
    const [systemInfor, setSystemInfor] = useState<SystemInfor>({userCount: 0, repoCount: 0, noteCount: 0, lastUpdate: new Date(), });


     const Sock = new SockJS(SERVER_WEBSOCKET_URL+'/ws');
     const stompClient = over(Sock);
 
     const connect =()=>{
         stompClient.connect({}, onConnected, onError);
     }
 
 
 
     const onConnected: (frame?: Frame | undefined) => any = () => {
         if(stompClient){
             stompClient.subscribe('/queue/system_infor', onMessageReceived);
         }
     }
 
 
     const onMessageReceived = (payload: Message)=>{
 

         if (payload.body) {
             
             const messageData: SystemInfor = JSON.parse(payload.body);
             setSystemInfor(messageData)
             
             
         }
        
     }
 
     const onError: (error: string | Frame) => any = (err: string | Frame) => {
         console.error(err);
     }

     const getSystemInfor = async () => {
        apiService.getSystemInfor()
            .then((response) => {setSystemInfor(response);})
            .catch((error)=>{console.error("Error:", error)})
    }

 
 
     useEffect(()=>{

        getSystemInfor()
        connect()
     },[])

    
    return(
    <div>
        <Header/>
        <ModalLayout/>
        <AdminLayout/>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Number of User</TableCell>
              <TableCell align="center">Number of Repo</TableCell>
              <TableCell align="center">Number of Note</TableCell>
              <TableCell align="center">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              <TableRow>
                <TableCell align="center">{systemInfor.userCount}</TableCell>
                <TableCell align="center">{systemInfor.repoCount}</TableCell>
                <TableCell align="center">{systemInfor.noteCount}</TableCell>
                <TableCell align="center">{systemInfor.lastUpdate.toString()}</TableCell>
              </TableRow>
          </TableBody>
        </Table>
        
        <Footer/>
    </div>
    )
    
}