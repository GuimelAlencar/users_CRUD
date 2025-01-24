import { useState, useEffect } from "react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Container,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableFooter,
  TableRow,
  Typography,
  Box,
  TablePagination,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

import { readUsers } from "../services/users-services";

import CreateUserModal from "../components/CreateUserModal";
import UpdateUserModal from "../components/UpdateUserModal";
import DeleteUserModal from "../components/DeleteUserModal";
TableFooter;
function UsersGrid() {
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    const toastGetUsers = toast.loading("Requesting users...");
    try {
      const response = await readUsers(page, rowsPerPage);
      const users = response.data.results;
      const count = response.data.count;
      setUsers(users);
      setCount(count);
      toast.update(toastGetUsers, {
        content: "Users succesfuly updated !",
        render: response.data.message,
        type: "success",
        isLoading: false,
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
      });
    } catch (error) {
      toast.update(toastGetUsers, {
        render: `Error: ${error.message}`,
        type: "error",
        isLoading: false,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
      });
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  return (
    <Container>
      <Box sx={{ py: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => setShowCreateUserModal(true)}
          >
            Add new User
          </Button>
        </Box>

        <Paper sx={{ p: 3, mb: 3 }} elevation={3}>
          <Typography variant="h5" gutterBottom>
            Users
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Users Grid
          </Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Birth Date</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell align="center">Edit</TableCell>
                  <TableCell align="center">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((item) => (
                  <TableRow key={item.user_id}>
                    <TableCell>{item.user_id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.birth_date}</TableCell>
                    <TableCell>{item.phone_number}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="info"
                        size="small"
                        onClick={() => {
                          setSelectedUserId(item.user_id);
                          setShowUpdateUserModal(true);
                        }}
                      >
                        <EditIcon />
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => {
                          setSelectedUserId(item.user_id);
                          setShowDeleteUserModal(true);
                        }}
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    count={count}
                    rowsPerPage={rowsPerPage}
                    page={page - 1}
                    slotProps={{
                      select: {
                        inputProps: {
                          "aria-label": "rows per page",
                        },
                        native: true,
                      },
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <CreateUserModal
          open={showCreateUserModal}
          handleClose={() => setShowCreateUserModal(false)}
          handleUpdate={getUsers}
        />
        <UpdateUserModal
          id={selectedUserId}
          open={showUpdateUserModal}
          handleClose={() => setShowUpdateUserModal(false)}
          handleUpdate={getUsers}
        />
        <DeleteUserModal
          id={selectedUserId}
          open={showDeleteUserModal}
          handleClose={() => setShowDeleteUserModal(false)}
          handleUpdate={getUsers}
        />
        <ToastContainer
          position="top-center"
          autoClose={2000}
          limit={3}
          closeOnClick
          pauseOnFocusLoss
          theme="dark"
        />
      </Box>
    </Container>
  );
}

export default UsersGrid;
