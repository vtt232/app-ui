import { ModalProps } from "../../Type/ModalPropsType";

function Modal(props: ModalProps) {
  let { message, close, ...rest} = props;

  return (
    <div id="modal-dialog">
      <div className="flex flex-col justify-center items-center">
        <div className="modal-content">
          {message? message : ""}
        </div>
        <button onClick={close}>
          Close
        </button>
      </div>
    </div>
  );
}
export default Modal;