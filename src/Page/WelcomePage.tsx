import React, { useEffect, useState } from "react";
import apiService from '../ApiCaller/ApiCaller'; 
import { useNavigate } from "react-router-dom";
export function WelcomePage() {

    const navigate = useNavigate()

    const redirectToExternalSite = (url: string) => {
      window.location.href = url; 
    };


    const checkLoginStatus = async () => {

      apiService.checkLoginStatus()
        .then((response)=>{
          if(response === true){
              navigate("/home")
          }
          else{
            apiService.getRedirectLink()
            .then((response)=>{
              redirectToExternalSite(response)
            })
            .catch((error)=>{console.error("Error:", error)})
          }
        })
        .catch((error)=>{console.error("Error:", error)})
        
  }

    useEffect(() => {
      checkLoginStatus()
    }, []);


    
    return (<div>
        {"Welcom To My Page"}
    </div>)
}