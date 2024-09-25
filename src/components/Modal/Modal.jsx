import { Dialog, DialogTitle } from "@material-ui/core";
import { useModal } from "context/ModalContext";

function Modal() {
  const { isOpen, content, closeModal, title } = useModal();

  return (
    <Dialog onClose={closeModal} open={isOpen}>
      <DialogTitle>{title}</DialogTitle>
      {content}
    </Dialog>
  );
}

Modal.propTypes = {};

export default Modal;
