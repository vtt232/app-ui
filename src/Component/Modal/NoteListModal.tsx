import { Dialog, DialogContent, Button, Typography, Box, DialogTitle, IconButton } from '@mui/material';
import { AddNoteForm } from '../AddNoteForm';
import NoteList from '../NoteList';
import { NoteListModalProps } from '../../Type/ModalPropsType';
import apiService from '../../ApiCaller/ApiCaller'; 
import { Note, NoteListPropsType } from '../../Type/RelatedNoteType';
import { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

function NoteListModal(props: NoteListModalProps) {


    const [updatingNoteFlag, setUpdatingNoteFlag] = useState<boolean>(false)

    const [notes, setNotes] = useState<Note[]>([{id:0,content:""}]);

    const getNotes = async (repoId: number) => {

        apiService.getNotesFromDB(repoId)
            .then((response) => {setNotes(response);})
            .catch((error)=>{console.error("Error:", error)})
    }


    useEffect(() => {
        if(typeof props.repoId === "number"){
            getNotes(props.repoId);
        }
    }, [updatingNoteFlag]);

    const noteListProps : NoteListPropsType = {data: {value: notes, setValue: setNotes}, repoId: props.repoId, repoName: props.repoName, 
                                                updatingNoteFlag: {value:updatingNoteFlag, setValue: setUpdatingNoteFlag}}


    if(typeof props.repoId === "number"){
        return(
            <Dialog open={props.isOpen} onClose={props.close}>
                <DialogTitle>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6">Note List Of {props.repoName}</Typography>
                        <IconButton color="inherit" onClick={props.close} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ marginBottom: 4, padding: 2 }}>
                        <AddNoteForm
                            {... noteListProps}
                        />
                    </Box>
                    <Box sx={{ marginBottom: 4, padding: 2 }}>
                        <NoteList
                            {... noteListProps}
                        />
                    </Box>
                </DialogContent>
            </Dialog>
           )

    }else{
        return (<div></div>)
    }
  }
  export default NoteListModal;