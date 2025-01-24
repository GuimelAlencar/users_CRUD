import { api } from "./api";

export async function createUser(data) {
  try {
    return await api.post("/users/", data);
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function readUser(id) {
  try {
    return await api.get(`/users/${id}`);
  } catch (error) {
    console.error("Error reading user:", error);
    throw error;
  }
}

export async function readUsers(page, page_size) {
  try {
    return await api.get("/get_users/", {
      params: {
        page: page,
        page_size: page_size,
      },
    });
  } catch (error) {
    console.error("Error reading users:", error);
    throw error;
  }
}

export async function updateUser(id, data) {
  try {
    return await api.put(`/users/${id}`, data); // Changed to PUT for better RESTful standards
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

export async function deleteUser(id) {
  try {
    return await api.delete(`/users/${id}`);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}
