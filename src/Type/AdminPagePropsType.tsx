import { NotificationModalProps } from "./ModalPropsType";
import { UseStateType } from "./UseStateType";

export interface AdminPageProps {
    modalProps: NotificationModalProps;
    sendMessageToNewAdmin: (newAdminName: string)=>void;
}

