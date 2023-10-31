import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../Component/Layout/Header";
import { Footer } from "../Component/Layout/Footer";
import { User } from "../Type/UserType";
import apiService from '../ApiCaller/ApiCaller'; 


export function HomePage() {


    const [user, setUser] = useState<User>();


    const getUser = async () => {
        apiService.getUserInformation()
            .then((response) => {setUser(response);})
            .catch((error)=>{console.error("Error:", error)})
    }

    
    useEffect(() => {
        getUser()
      }, []);

    return (
        <div className="column">
            <Header/>
                <div className="item">Username: {user?.login}</div>
                <div className="item">Link Github: {user?.url}</div>
               <Link to="/repo-list">
                    <button className="item">Show your Github repository list</button>
                </Link>    
            <Footer/>
        </div>
    )
        
}