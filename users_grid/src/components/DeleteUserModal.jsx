import { toast } from "react-toastify";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { deleteUser } from "../services/users-services";

export default function DeleteUserModal({
  id,
  open,
  handleClose,
  handleUpdate,
}) {
  async function excludeUser() {
    const toastDeleteUser = toast.loading("Deleting user...");

    try {
      const response = await deleteUser(id);
      handleClose();
      handleUpdate();
      toast.update(toastDeleteUser, {
        render: response.data.message,
        type: "success",
        isLoading: false,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
      });
    } catch (error) {
      toast.update(toastDeleteUser, {
        render: `An error has occurred: ${error.message}`,
        type: "error",
        isLoading: false,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
      });
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} disableEscapeKeyDown>
      <DialogTitle>Delete User</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete this user? This action cannot be
          undone, and all associated data will be permanently removed.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={excludeUser} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
