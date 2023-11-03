import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../Component/Layout/Header";
import { Footer } from "../Component/Layout/Footer";
import { User, UserControllProps } from "../Type/UserType";
import apiService from '../ApiCaller/ApiCaller'; 


export function HomePage(props: UserControllProps) {





    const getUser = async () => {
        apiService.getUserInformation()
            .then((response) => {props.setUser(response);})
            .catch((error)=>{console.error("Error:", error)})
    }

    
    useEffect(() => {
        getUser()
      }, []);

    return (
        <div className="column">
            <Header/>
                <div className="item">Username: {props.user?.login}</div>
                <div className="item">Link Github: {props.user?.url}</div>
               <Link to="/repo-list">
                    <button className="item">Show your Github repository list</button>
                </Link>    
            <Footer/>
        </div>
    )
        
}