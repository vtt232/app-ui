import { User } from "./UserType";

export interface UserRootState {
    user: User;
    loading: boolean;
    error: string | null;
}

export interface stateRedux {
    userReducer: UserRootState
}