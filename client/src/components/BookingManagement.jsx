
import React, { useEffect, useState } from 'react';
import '../styles/BookingManagement.scss';
import {
    Container, Typography, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Button, TextField, Dialog,
    DialogActions, DialogContent, DialogTitle, Paper
} from "@mui/material";
import axios from "axios";

const BookingManagement = () => {
    const [bookings, setBookings] = useState([]);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ startDate: "", endDate: "" });
    const [editBooking, setEditBooking] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch('http://localhost:3001/bookings');
                const data = await response.json();
                // setBookings(data);

              // Sort by startDate ascending
              const sortedData = data.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

              setBookings(sortedData);


            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };

        fetchBookings();
    }, []);

    const handleUpdateBooking = async () => {
        if (
            formData.startDate === editBooking.startDate &&
            formData.endDate === editBooking.endDate
        ) {
            alert("No changes detected.");
            return;
        }

        try {
            const response = await axios.patch(
                `http://localhost:3001/bookings/${editBooking._id}/update`,
                formData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setBookings(bookings.map(b => (b._id === editBooking._id ? response.data : b)));
            setOpen(false);
        } catch (error) {
            console.error("Error updating booking:", error.response?.data || error.message);
        }
    };

    const handleEditClick = (booking) => {
        setEditBooking(booking);
        setFormData({
            startDate: booking.startDate,
            endDate: booking.endDate
        });
        setOpen(true);
    };

    return (
        <Container className="booking-container">
            <Typography variant="h4" gutterBottom>Booking Management</Typography>
            <TableContainer component={Paper} className="table-wrapper">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Property</TableCell>
                            <TableCell>Check-in</TableCell>
                            <TableCell>Check-out</TableCell>
                            <TableCell>Total Price</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bookings.map(booking => (
                            <TableRow key={booking._id}>
                                <TableCell>{booking.listingId?.title}</TableCell>
                                <TableCell>{booking.startDate}</TableCell>
                                <TableCell>{booking.endDate}</TableCell>
                                <TableCell>${booking.totalPrice}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={() => handleEditClick(booking)}
                                    >
                                        Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Edit Booking</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Start Date"
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        margin="dense"
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        fullWidth
                        label="End Date"
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        margin="dense"
                        InputLabelProps={{ shrink: true }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleUpdateBooking}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default BookingManagement;
