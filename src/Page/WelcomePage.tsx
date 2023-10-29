import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export function WelcomePage() {

    const retrievedData = localStorage.getItem('serverUrl');
    const navigate = useNavigate()



  useEffect(() => {
    if (retrievedData !== null) {

        navigate("/home")
        
    }
    else {

        navigate("/login")
    }
  }, []);
    
    return (<div>
        {"Welcom To My Page"}
    </div>)
}