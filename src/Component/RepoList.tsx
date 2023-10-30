import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../Constant/Constant";
import { Repo } from "../Type/RepoType";
import apiService from '../ApiCaller/ApiCaller'; // Import the ApiService class
import { RepoListPropsType } from "../Type/RepoListPropsType";

function RepoList(props: RepoListPropsType) {

    const [repos, setRepos] = useState<Repo[]>([{name:"",url:"",language:""}]);
    const [page, setPage] = useState(0);

    const getRepos = async () => {

        apiService.getRepositoriesFromDB(page)
            .then((response) => {setRepos(response);})
            .catch((error)=>{console.error("Error:", error)})
    }


    useEffect(() => {
        getRepos();
    }, [props.pullStatus, page]);

    return (

        <div>
        <table>
          <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Link</th>
                <th>Language</th>
            </tr>
          </thead>
          <tbody>
            {repos.map((item, i) => (
              <tr key={i}>
                <td>{i+1}</td>
                <td>{item.name}</td>
                <td>{item.url}</td>
                <td>{item.language}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <button onClick={() => setPage(page - 1)} disabled={page === 0}>
            Previous
          </button>
          <button onClick={() => setPage(page + 1)}>Next</button>
        </div>
      </div>
    )

}

export default RepoList;