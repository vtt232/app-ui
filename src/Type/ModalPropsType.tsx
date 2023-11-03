export interface ModalProps {
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    close: () => void;
    open: () => void;
}

export interface AdminPageProps {
    adminNameField: string;
    setAdminNameField: React.Dispatch<React.SetStateAction<string>>,
    modalProps: ModalProps;
    sendMessageToNewAdmin: ()=>void;

}