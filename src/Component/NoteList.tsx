import React, { useEffect, useState } from "react";
import { Note } from "../Type/NoteListPropsType";
import apiService from '../ApiCaller/ApiCaller';
import { NoteListPropsType } from "../Type/NoteListPropsType";


function NoteList(props: NoteListPropsType) {



  const handleContentChange = (id: number, newContent: string) => {
    const updatedNotes = props.notes.map((note) => {
      if (note.id === id) {
        return { ...note, content: newContent };
      }
      return note;
    });
    props.setNotes(updatedNotes);
  };


  const handleSave = (noteId: number) => {


    const noteToUpdate = props.notes.find((note) => note.id === noteId);

    if (noteToUpdate) {

      const updateContent = noteToUpdate.content;

      apiService.updateNote(props.repoId, noteId, updateContent)
        .then(() => {props.setUpdateNoteStatus(!props.updateNoteStatus)})
        .catch((error)=>{console.error("Error:", error)});
    }  
    else {
      console.error(`Note with id ${noteId} not found.`);
    }


  };


  const handleDelete = (noteId: number) => {

    const noteToDelete = props.notes.find((note) => note.id === noteId);
    
    if (noteToDelete) {

      apiService.deleteNote(props.repoId, noteId)
        .then(() => {props.setUpdateNoteStatus(!props.updateNoteStatus)})
        .catch((error)=>{console.error("Error:", error)});

    } 
    else {
      console.error(`Note with id ${noteId} not found.`);
    }

  };

    
    return (

        <div>
        <table>
          <thead>
            <tr>
                <th>Id</th>
                <th>Content</th>
                <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {props.notes.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td><input
                  type="text"
                  value={item.content}
                  onChange={(e) => handleContentChange(item.id, e.target.value)}
                /></td>
                <td>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                  <button onClick={() =>handleSave(item.id)}>Save</button>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )

}

export default NoteList;