import RepoList from "../Component/RepoList";
import apiService from '../ApiCaller/ApiCaller'; // Import the ApiService class
import { useState } from "react";

export function RepoListPage() {

    const [pullStatus, setPullStatus] = useState<string>("Have not updated")

    const pullRepositoriesFromGithub = async () => {
        apiService.pullRepositoriesFromGithub()
            .then((response)=>{setPullStatus("Update Successfully")})
            .catch(((error)=>{console.error("Error:", error); setPullStatus("Update Failed")}))
        
    };



    
    return (
        <div className="column">
            <div>
                <button onClick={pullRepositoriesFromGithub}>Pull your repositories from Github</button>
                <div>{pullStatus}</div>
            </div>
            <RepoList pullStatus={pullStatus}/>
        </div>
    )

}

