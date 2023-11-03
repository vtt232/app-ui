export interface User {
    login: string,
    url: string,
}

export interface UserControllProps{
    user: User | undefined;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}