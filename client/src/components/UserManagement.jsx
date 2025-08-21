import React, { useEffect, useState } from "react";
import {
    Container, Typography, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Button, TextField, Dialog,
    DialogActions, DialogContent, DialogTitle
} from "@mui/material";
import axios from "axios";
import '../styles/UserManagement.scss';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState(null);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", role: "" });
    const token = localStorage.getItem("token");

    // Fetch Users from API
    const fetchUsers = async () => {
        try {
            
            // Add the Authorization header to request for JWT token
            const response = await axios.get("http://localhost:3001/users/all", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(response.data);
        } catch (error) {
            console.log("error::",error)
            console.error("Error fetching users:", error.response?.data || error.message);
            // Optionally, you can redirect to login if the token is invalid or expired
            if (error.response?.status === 403) {
                alert("Access Denied. Please login as an admin.");
                // Redirect to login page (example: using React Router)
                // history.push('/login');
            }
        }
    };

    // Handle Delete User with Confirmation
    const handleDeleteUser = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            await axios.delete(`http://localhost:3001/users/all/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(users.filter(user => user._id !== id));  // Remove user from state
        } catch (error) {
            console.error("Error deleting user:", error.response?.data || error.message);
        }
    };

    // Open Edit User Dialog
    const handleEditUser = (user) => {
        setEditUser(user);
        setFormData({ firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role });
        setOpen(true);
    };

    // Handle Update User
    const handleUpdateUser = async () => {
        if (
            formData.firstName === editUser.firstName &&
            formData.lastName === editUser.lastName &&
            formData.role === editUser.role
        ) {
            alert("No changes detected.");
            return;
        }

        try {
            const response = await axios.put(`http://localhost:3001/users/all/${editUser._id}`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(users.map(user => (user._id === editUser._id ? response.data : user)));
            setOpen(false);
        } catch (error) {
            console.error("Error updating user:", error.response?.data || error.message);
        }
    };

    useEffect(() => {
        fetchUsers();  // Fetch users when the component is mounted
    }, [token]);

    return (
        <div className="user-management-wrapper">
        <Container>
            <Typography variant="h4" gutterBottom>User Management</Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(user => (
                            <TableRow key={user._id}>
                                <TableCell>{user.firstName} {user.lastName}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleEditUser(user)}
                                        sx={{ mr: 1 }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleDeleteUser(user._id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Edit User Dialog */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth label="First Name"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth label="Last Name"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth label="Email"
                        value={formData.email}
                        disabled
                        margin="dense"
                    />
                    <TextField
                        fullWidth label="Role"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        margin="dense"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button color="primary" variant="contained" onClick={handleUpdateUser}>Save</Button>
                </DialogActions>
            </Dialog>
        </Container>
        </div>
    );
};

export default UserManagement;


