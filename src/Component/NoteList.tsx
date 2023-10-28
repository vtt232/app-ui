import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../Constant/Constant";
import { Note } from "../Types/NoteType";
function NoteList() {

    const [notes, setNotes] = useState<Note[]>();

    const getNotes = async () => {

        console.log(SERVER_URL)
        const response = await fetch(
            SERVER_URL + '/note',
            {
                method: 'GET', redirect: "follow", credentials: 'include',
                headers: {accept: 'application/json'}
            }
        ).then((response) => response);

        if(response.redirected) {
            document.location = response.url;
        }
        const data = await response.json();
        setNotes(data)
    }

    function handleClick() {
        getNotes();
    }

    useEffect(() => {
        getNotes();
    }, []);

    return (
        <>
        <table>
            <tr>
                <th>Id</th>
                <th>Content</th>
            </tr>
            {notes &&
                notes.map((note) => (
                    <tr key={note.id}>
                        <td>{note.content}</td>
                    </tr>
                ))}
        </table>
        </>
    )

}

export default NoteList;