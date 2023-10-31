import { useState } from "react";
import apiService from '../ApiCaller/ApiCaller';
import { NoteListPropsType } from "../Type/NoteListPropsType";

export function AddNoteForm (props: NoteListPropsType) {



  const [content, setContent] = useState<string>('');



  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };


  const addNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    apiService.addNote(props.repoId, content)
        .then(() => {props.setUpdateNoteStatus(!props.updateNoteStatus)})
        .catch((error)=>{console.error("Error:", error)})

  
    
  };


    return(<div>
        <h2>My Form</h2>
        <form onSubmit={addNoteSubmit}>
          <div>
            <label htmlFor="content">Content:</label>
            <input
              type="text"
              id="content"
              content={content}
              onChange={handleContentChange}
            />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>)
}