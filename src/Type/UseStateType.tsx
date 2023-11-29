

export type UseStateType<T> = {
    value: T;
    setValue: React.Dispatch<React.SetStateAction<T>>;
}
