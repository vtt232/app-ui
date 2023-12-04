import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../Component/Layout/Header";
import { Footer } from "../Component/Layout/Footer";

import { useDispatch, useSelector } from "react-redux";
import { requestUserInfor } from "../sagas/actions";
import { UserRootState, stateRedux } from "../Type/ReduxTypes";
import { CenteredContent } from "../Component/Content/CenterContent";

import { Container, Typography, Button, Box } from '@mui/material';
import { ModalLayout } from "../Component/Layout/Modal,Layout";


export function HomePage() {

    const dispatch = useDispatch()
    const userReducer = useSelector((state: stateRedux) =>state.userReducer)

    useEffect(()=>{
        dispatch(requestUserInfor())
    },[dispatch])

      

    


    return (
        <div className="column">
            <Header/>
            <CenteredContent>
                <Box sx={{ marginBottom: 2 }}>
                    <div className="item">USERNAME: {userReducer.user.login}</div>
                </Box>
                <Box sx={{ marginBottom: 2 }}>
                    <div className="item">LINK GITHUB: <a href={userReducer.user.url}>{userReducer.user.url}</a></div>
                </Box>
            </CenteredContent>
            {userReducer.user.login && <ModalLayout/>}
            <Footer/>
        </div>
    )
        
}