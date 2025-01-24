import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  CircularProgress,
} from "@mui/material";

import { updateUser, readUser } from "../services/users-services";

export default function UpdateUserModal({
  id,
  open,
  handleClose,
  handleUpdate,
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    user_id: null,
    name: "",
    email: "",
    password: "",
    birth_date: "",
    phone_number: "",
    created_at: "",
    updated_at: ""
  });

  useEffect(() => {
    if (open && id) {
      const fetchUserData = async () => {
        const toastLoadingUser = toast.loading("Loading user...");
        setLoading(true);
        try {
          const response = await readUser(id);
          setFormData({
            email: response.data.email,
            phone_number: response.data.phone_number,
            birth_date: response.data.birth_date,
          });
          setLoading(false);
          toast.update(toastLoadingUser, {
            render: "User Successfully loaded",
            type: "success",
            isLoading: false,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
          });
        } catch (error) {
          setLoading(false);
          toast.update(toastLoadingUser, {
            render: `Error fetching user data: ${error.message}`,
            type: "error",
            isLoading: false,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
          });
        }
      };
      fetchUserData();
    }
  }, [open, id]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const toastSubmit = toast.loading("Updating user...");
    try {
      const response = await updateUser(id, formData);
      handleClose();
      handleUpdate();
      toast.update(toastSubmit, {
        render: response.data.message,
        type: "success",
        isLoading: false,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
      });
    } catch (error) {
      toast.update(toastSubmit, {
        render: `Error: ${error.message}`,
        type: "error",
        isLoading: false,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
      });
    }
  }

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      disableEscapeKeyDown
      maxWidth="sm"
      fullWidth
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle>Update User</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Birth Date"
              type="date"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="Phone"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="(XX) X XXXX-XXXX"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            color="error"
            onClick={() => {
              setFormData({
                email: "",
                phone_number: "",
                birth_date: "",
              });
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="success">
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
