
import { SERVER_URL } from "../Constant/Constant";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Link } from "react-router-dom";

export function HomePage() {
    const [num, setNum] = useState<number>();
    const token = Cookies.get("jwtToken");
    // Configure Axios with the JWT token
    const axiosInstance = axios.create({
        baseURL: SERVER_URL,
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
  

    const getNumber = async () => {
          
        // Make the API request
        axiosInstance
        .get("/jwt/client3") // Change the HTTP method and endpoint as needed
        .then((response) => {
            console.log(response.data); // Handle the API response data here
            setNum(response.data)
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    }
    
    useEffect(() => {
        getNumber()
      }, []);

    return (
    <div>
            {num}
            <Link to="/note">
                <button>Go to Note Page</button>
            </Link>    
    </div>)
}