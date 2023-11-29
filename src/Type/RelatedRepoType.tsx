import { UseStateType } from "./UseStateType";

export interface Repo {
    id: number;
    name: string;
    url: string;  
    language: string;
}
export interface RepoListPropsType {
    data: Repo[];
    pagination: UseStateType<number>;
    pickNote: (repoId: number, repoName: string, event: React.MouseEvent<HTMLTableRowElement>) => void;
    openNoteListModal: () => void; 
}