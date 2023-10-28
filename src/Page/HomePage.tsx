
import { SERVER_URL } from "../Constant/Constant";
import React, { useEffect, useState } from "react";
export function HomePage() {
    const [num, setNum] = useState<number>();


    const getNumber = async () => {
          
    
        console.log(SERVER_URL)
        const response = await fetch(
              SERVER_URL + '/client3',
              {
                  method: 'GET',
                  headers: {accept: 'application/json'}
              }
        ).then((response) => response);
    
    
        const res = await response.json();
        setNum(res)
        
          
    }
    
    useEffect(() => {
        getNumber()
      }, []);

    return (
    <div>
        {num}    
    </div>)
}