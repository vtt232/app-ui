import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../Component/Layout/Header";
import { Footer } from "../Component/Layout/Footer";
import { User} from "../Type/UserType";
import apiService from '../ApiCaller/ApiCaller'; 
import { useDispatch, useSelector } from "react-redux";
import { requestUserInfor } from "../sagas/actions";
import { UserRootState, stateRedux } from "../Type/ReduxTypes";
import { Reducer, Store } from "redux";


export function HomePage() {

    const dispatch = useDispatch()
    const userReducer = useSelector((state: stateRedux) =>state.userReducer)

    useEffect(()=>{
        dispatch(requestUserInfor())
    },[dispatch])

    


    return (
        <div className="column">
            <Header/>
                <div className="item">Username: {userReducer.user.login}</div>
                <div className="item">Link Github: {userReducer.user.url}</div>
               <Link to="/repo-list">
                    <button className="item">Show your Github repository list</button>
                </Link>    
            <Footer/>
        </div>
    )
        
}