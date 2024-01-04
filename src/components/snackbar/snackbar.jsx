import { Snackbar as MuiSnackBar } from "@mui/material";
import './snackbar.scss';

const Snackbar = ({ open, onClose, message, className, autoHideDuration }) => {
  return (
    <MuiSnackBar
      open={open}
      onClose={onClose}
      autoHideDuration={autoHideDuration}
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
      message={message}
      className={`${className}`}
    />
  );
};
export default Snackbar;
