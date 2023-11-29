import { useState } from "react";
import apiService from '../ApiCaller/ApiCaller';
import { NoteListPropsType } from "../Type/RelatedNoteType";
import { Container, Typography, Button, Box, TextField } from '@mui/material';
import { CenteredContent } from "../Component/Content/CenterContent";

export function AddNoteForm (props: NoteListPropsType) {



  const [content, setContent] = useState<string>('');



  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };


  const addNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if(typeof props.repoId === "number"){
      apiService.addNote(props.repoId, content)
        .then(() => {props.updatingNoteFlag.setValue(!props.updatingNoteFlag.value)})
        .catch((error)=>{console.error("Error:", error)})
    }

  };


    return(
      <Box display="flex" flexDirection="column" alignItems="center">
          <form onSubmit={addNoteSubmit}>
          <div>
          <label htmlFor="content">
            <Typography variant="h6">NEW NOTE:</Typography>
          </label>
          <TextField
            type="text"
            id="content"
            value={content}
            onChange={handleContentChange}
          />
          </div>
          <Box mt={2} display="flex" justifyContent="center">
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
        </form>
        </Box>
  )
}