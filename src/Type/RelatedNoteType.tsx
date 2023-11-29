import { UseStateType } from "./UseStateType";

export interface Note {
    id: number;
    content: string;
}
export interface NoteListPropsType {
    data: UseStateType<Note[]>;
    repoId: number | null;
    repoName: string | null;
    updatingNoteFlag: UseStateType<boolean>;
}
