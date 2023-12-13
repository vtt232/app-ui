import { User } from "./UserType";

export interface UserRootState {
    user: User;
    loading: boolean;
    error: string | null;
}

export interface ModalRootState {
    message: string;
    openStatus: boolean;
}

export interface stateRedux {
    userReducer: UserRootState;
    modalReducer: ModalRootState;
}