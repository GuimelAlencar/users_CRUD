import { useState } from "react";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { createUser } from "../services/users-services";

export default function CreateUserModal({ open, handleClose, handleUpdate }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    birth_date: "",
    phone_number: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const toastCreateUser = toast.loading("Creating user...");

    try {
      const response = await createUser(formData);
      handleClose();
      handleUpdate();
      toast.update(toastCreateUser, {
        render: response.data.message,
        type: "success",
        isLoading: false,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
      });
      setFormData({
        name: "",
        email: "",
        password: "",
        birth_date: "",
        phone_number: "",
      });
    } catch (error) {
      toast.update(toastCreateUser, {
        render: `Error: ${error.message}`,
        type: "error",
        isLoading: false,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
      });
    }
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
        <DialogTitle>Register New User</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
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
              label="Password"
              type="password"
              name="password"
              value={formData.password}
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
              label="Phone number"
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
                name: "",
                password: "",
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
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
