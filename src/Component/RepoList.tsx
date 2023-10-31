import React, { useEffect, useState } from "react";
import apiService from '../ApiCaller/ApiCaller'; 
import {Repo, RepoListPropsType } from "../Type/RepoListPropsType";
import { useNavigate } from "react-router-dom";

function RepoList(props: RepoListPropsType) {

    const [repos, setRepos] = useState<Repo[]>([{id:0,name:"",url:"",language:""}]);
    const [page, setPage] = useState(0);
    const navigate = useNavigate()

    const getRepos = async () => {

        apiService.getRepositoriesFromDB(page)
            .then((response) => {setRepos(response);})
            .catch((error)=>{console.error("Error:", error)})
    }

    const redirectToNoteListOfRepo = (repoId:number, event: React.MouseEvent<HTMLTableRowElement>)=>{
        navigate("../repo/"+repoId)
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
            {repos.map((item) => (
              <tr key={item.id} onClick={(event) => redirectToNoteListOfRepo(item.id, event)}>
                <td>{item.id}</td>
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