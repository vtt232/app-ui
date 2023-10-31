import { useNavigate, useParams } from "react-router-dom";
import NoteList from "../Component/NoteList";
import React, { useEffect, useState } from "react";
import { AddNoteForm } from "../Component/AddNoteForm";
import { Note } from "../Type/NoteListPropsType";
import apiService from '../ApiCaller/ApiCaller'; 
export function NoteListPage () {

    let {id}=useParams()
    const navigate = useNavigate()

    const [updateNoteStatus, setUpdateNoteStatus] = useState<boolean>(false)

    const [notes, setNotes] = useState<Note[]>([{id:0,content:""}]);

    const getNotes = async (repoId: number) => {

        apiService.getNotesFromDB(repoId)
            .then((response) => {setNotes(response);})
            .catch((error)=>{console.error("Error:", error)})
    }


    useEffect(() => {
        if(typeof id === "string"){
            getNotes(parseInt(id));
        }
    }, [updateNoteStatus]);


    if(typeof id === "string"){
        return(
        <div>
            <AddNoteForm notes={notes} setNotes={setNotes} updateNoteStatus={updateNoteStatus} repoId={parseInt(id)} setUpdateNoteStatus={setUpdateNoteStatus}/>
            <NoteList notes={notes} setNotes={setNotes} updateNoteStatus={updateNoteStatus} repoId={parseInt(id)} setUpdateNoteStatus={setUpdateNoteStatus}/>
        </div>)

    }else{
        navigate("/")
        return (<div></div>)
    }

}