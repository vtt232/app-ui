export interface Note{id: number, content: string}
export interface NoteListPropsType {
    repoId: number,
    updateNoteStatus: boolean,
    setUpdateNoteStatus: React.Dispatch<React.SetStateAction<boolean>>,
    notes: Note[],
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>,
}