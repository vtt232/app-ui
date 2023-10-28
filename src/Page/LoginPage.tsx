
import { SERVER_URL } from "../Constant/Constant";
import React, { useEffect } from "react";


export function LoginPage() {
    
    const redirectToExternalSite = (url: string) => {
        localStorage.setItem('serverUrl', url);
        window.location.href = url; // Replace with the desired URL
      };
    
      const getLoginPage = async () => {
          
    
        console.log(SERVER_URL)
        const response = await fetch(
              SERVER_URL + '/client-login',
              {
                  method: 'GET',
                  headers: {accept: 'application/json'}
              }
        ).then((response) => response);
    
    
        const data = await response.text();
        redirectToExternalSite(data)
          
    }
    
    useEffect(() => {
        getLoginPage()
      }, []);
    

    
      return (
        <div>  
        </div>)
}