import RepoList from "../Component/RepoList";
import apiService from '../ApiCaller/ApiCaller';
import { useEffect, useState } from "react";
import {Footer } from "../Component/Layout/Footer";
import { Header } from "../Component/Layout/Header";
import { CenteredContent } from "../Component/Content/CenterContent";
import { createPortal } from "react-dom";
import { Container, Typography, Button, Box } from '@mui/material';
import NoteListModal from "../Component/Modal/NoteListModal";
import { Repo, RepoListPropsType } from "../Type/RelatedRepoType";
import { NoteListModalProps } from "../Type/ModalPropsType";
import { ModalLayout } from "../Component/Layout/ModalLayout";

export function RepoListPage() {

    // PULL REPO FROM GITHUB

    const [pullStatus, setPullStatus] = useState<boolean>(false)
    const [pullStatusMessage, setPullStatusMessage] = useState<string>("Have not been updated yet")

    const pullRepositoriesFromGithub = async () => {

        setPullStatusMessage("Loading...");

        apiService.pullRepositoriesFromGithub()
            .then((response)=>{
                setPullStatus(true);
                setPullStatusMessage("Updated Successfully");
            })
            .catch(((error)=>{
                console.error("Error:", error);
                setPullStatus(false); 
                setPullStatusMessage("Failed Updating")
            }))
        
    };

    // GET REPO FROM DB
    const [repos, setRepos] = useState<Repo[]>([{id:0,name:"",url:"",language:""}]);
    const [page, setPage] = useState(0);

    const getRepos = async () => {
        apiService.getRepositoriesFromDB(page)
            .then((response) => {setRepos(response);})
            .catch((error)=>{console.error("Error:", error)})
    }

    useEffect(() => {
        getRepos();
    }, [pullStatus, page]);

    // NOTE LIST POPUP
    const modalDomElement = document.getElementById("portal-root");
    const [stateNoteListModal, setStateNoteListModal] = useState<boolean>(false);

    const [repoId, setRepoId] = useState<number | null>(null);
    const [repoName, setRepoName] = useState<string | null>(null);

    const pickNote = (repoId: number, repoName: string, event: React.MouseEvent<HTMLTableRowElement>)=>{
        setRepoId(repoId);
        setRepoName(repoName);
    }
    const closeNoteListModal = () => setStateNoteListModal(false);
    const openNoteListModal = () => setStateNoteListModal(true);

    //Preparing props
    const repoListProps : RepoListPropsType = {
        data: repos,
        pagination: {value: page, setValue: setPage},
        pickNote: pickNote,
        openNoteListModal: openNoteListModal,
    }

    const noteListModalProps : NoteListModalProps = {
        repoId: repoId,
        repoName: repoName,
        open: openNoteListModal,
        close: closeNoteListModal,
        isOpen: stateNoteListModal,

    }

    
    return (
        <div>
            {stateNoteListModal && modalDomElement &&
                    createPortal(
                        <NoteListModal {...noteListModalProps}/>,
                        modalDomElement
                    )
            }
            
            <Header/>
            <CenteredContent>
                <Box sx={{ marginBottom: 2, textAlign: 'center' }}>
                    <div>
                        <Button variant="contained" className="item" onClick={pullRepositoriesFromGithub}>Pull your repositories from Github</Button>
                        <div style={{ marginTop: '10px', textTransform: 'uppercase' }}>{pullStatusMessage}</div>
                    </div>
                </Box>
                <Box sx={{ marginBottom: 2 }}>
                    <RepoList {... repoListProps}/>
                </Box>
            </CenteredContent>
            <ModalLayout/>
            <Footer/>
        </div>
        
    )

}

