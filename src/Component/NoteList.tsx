import React, { useEffect, useState } from "react";
import { Note } from "../Type/RelatedNoteType";
import apiService from '../ApiCaller/ApiCaller';
import { NoteListPropsType } from "../Type/RelatedNoteType";
import { Table, TableHead, TableBody, TableRow, TableCell, Button, Box,TextField } from '@mui/material';

function NoteList(props: NoteListPropsType) {



  const handleContentChange = (id: number, newContent: string) => {
    const updatedNotes = props.data.value.map((note) => {
      if (note.id === id) {
        return { ...note, content: newContent };
      }
      return note;
    });
    props.data.setValue(updatedNotes);
  };


  const handleSave = (noteId: number) => {


    const noteToUpdate = props.data.value.find((note) => note.id === noteId);

    if (noteToUpdate && typeof props.repoId === "number") {

      const updateContent = noteToUpdate.content;

      apiService.updateNote(props.repoId, noteId, updateContent)
        .then(() => {props.updatingNoteFlag.setValue(!props.updatingNoteFlag.value)})
        .catch((error)=>{console.error("Error:", error)});
    }  
    else {
      console.error(`Note with id ${noteId} not found.`);
    }


  };


  const handleDelete = (noteId: number) => {

    const noteToDelete = props.data.value.find((note) => note.id === noteId);
    
    if (noteToDelete && typeof props.repoId === "number") {

      apiService.deleteNote(props.repoId, noteId)
        .then(() => {props.updatingNoteFlag.setValue(!props.updatingNoteFlag.value)})
        .catch((error)=>{console.error("Error:", error)});

    } 
    else {
      console.error(`Note with id ${noteId} not found.`);
    }

  };

    
    return (
   <Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Id</TableCell>
            <TableCell align="center">Note</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.value.map((item, keyId) => (
            <TableRow key={keyId}>
              <TableCell>{keyId + 1}</TableCell>
              <TableCell>
                <TextField
                  type="text"
                  value={item.content}
                  onChange={(e) => handleContentChange(item.id, e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Button onClick={() => handleDelete(item.id)}>Delete</Button>
                <Button onClick={() => handleSave(item.id)}>Save</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
    )

}

export default NoteList;