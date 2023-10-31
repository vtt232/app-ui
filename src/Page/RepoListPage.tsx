import RepoList from "../Component/RepoList";
import apiService from '../ApiCaller/ApiCaller';
import { useState } from "react";
import {Footer } from "../Component/Layout/Footer";
import { Header } from "../Component/Layout/Header";

export function RepoListPage() {

    const [pullStatus, setPullStatus] = useState<string>("Have not updated")

    const pullRepositoriesFromGithub = async () => {
        apiService.pullRepositoriesFromGithub()
            .then((response)=>{setPullStatus("Update Successfully")})
            .catch(((error)=>{console.error("Error:", error); setPullStatus("Update Failed")}))
        
    };



    
    return (
        <div>
            <Header/>
            <div className="column">
            <div>
                <button onClick={pullRepositoriesFromGithub}>Pull your repositories from Github</button>
                <div>{pullStatus}</div>
            </div>
            <RepoList pullStatus={pullStatus}/>
            </div>
            <Footer/>
        </div>
        
    )

}

