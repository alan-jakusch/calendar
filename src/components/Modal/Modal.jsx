import { Dialog, DialogTitle } from "@material-ui/core";
import { useModal } from "context/ModalContext";

function Modal() {
  const { isOpen, content, closeModal, title } = useModal();

  return (
    <Dialog
      onClose={closeModal}
      open={isOpen}
      fullWidth
      PaperProps={{
        style: {
          height: "400px", // Adjust height as needed
          overflow: "visible", // Prevent scrolling
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      {content}
    </Dialog>
  );
}

Modal.propTypes = {};

export default Modal;
