import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector, useDispatch } from "react-redux";
import { modalAction } from "../../store/modal-slice";

const Modal = ({ handleYes, hideModal }) => {
  const modalState = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const title = modalState.title;
  const content = modalState.content;
  const isOpen = modalState.isOpen;

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        dispatch(modalAction.closeModal());
        hideModal();
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            dispatch(modalAction.closeModal());
            hideModal();
          }}
        >
          No
        </Button>
        <Button
          onClick={() => {
            handleYes();
            dispatch(modalAction.closeModal());
            hideModal();
          }}
          autoFocus
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default Modal;
