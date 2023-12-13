import { Dispatch } from "redux";
import { UseStateType } from "./UseStateType";

interface BaseModalProps {
    open: () => void;
    close: () => void;
    isOpen: boolean;
  }
  
export interface NotificationModalProps extends BaseModalProps {
    message: string;
}
  
export interface NoteListModalProps extends BaseModalProps {
    repoId: number | null;
    repoName: string | null;
}


