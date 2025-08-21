import express from "express";
import Booking from "../models/Booking.js";
import User from "../models/User.js";
import sendMail from "../utils/sendMail.js"; // If you've added this utility
import QRCode from 'qrcode';

const router = express.Router();

/* CREATE BOOKING */
router.post("/create", async (req, res) => {
  try {
    const { customerId, hostId, listingId, startDate, endDate, totalPrice } = req.body;

    const newStart = new Date(startDate);
    const newEnd = new Date(endDate);
    newStart.setHours(0, 0, 0, 0);
    newEnd.setHours(23, 59, 59, 999);

    const bookings = await Booking.find({ listingId });

    const isOverlapping = bookings.some((booking) => {
      return (
        new Date(booking.startDate) <= newEnd &&
        new Date(booking.endDate) >= newStart
      );
    });
    

    if (isOverlapping) {
      return res.status(400).json({ message: "Property is already booked for these dates." });
    }

    const newBooking = new Booking({
      customerId,
      hostId,
      listingId,
      startDate: newStart,
      endDate: newEnd,
      totalPrice,
    });

    await newBooking.save();

    const user = await User.findById(customerId);

    if (user?.email) {
      const subject = "Booking Confirmed!";
      const html = `
        <h3>Hello ${user.firstName},</h3>
        <p>Your booking has been confirmed successfully.</p>
        <p><strong>Price:</strong> Rs:${totalPrice}</p>
        <p><strong>Check-in:</strong> ${newStart.toDateString()}</p>
        <p><strong>Check-out:</strong> ${newEnd.toDateString()}</p>
         
          <div style="text-align: center; margin: 20px 0;">
          <p><strong>Your Booking QR Code</strong></p>
          <img src="cid:qrCode@booking.com" alt="Booking QR Code" style="width: 200px; height: 200px;">
          <p style="font-size: 12px; color: #666;">Scan this QR code for quick check-in</p>
        </div>

        <br/>
        <p>Thank you for choosing us! 🏡</p>
      `;
    
            // Generate QR Code URL (you can customize the data you want to encode)
            const qrCodeData = `Booking Details: ${listingId} from ${newStart.toDateString()} to ${newEnd.toDateString()}`;
            const qrCodeDataURL = await QRCode.toDataURL(qrCodeData);


      await sendMail(user.email, subject, html, qrCodeDataURL);
    }

    res.status(200).json(newBooking);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to create a new Booking!", error: err.message });
  }
});

/* DELETE BOOKING */
router.delete("/:bookingId", async (req, res) => {
  try {
    const { bookingId } = req.params;

    // Find and delete the booking
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);
    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Remove the booking from the user's trip list
    const user = await User.findById(deletedBooking.customerId);
    if (user) {
      user.tripList = user.tripList.filter(
        (trip) => trip._id.toString() !== bookingId
      );
      await user.save();
    }

    res.status(200).json({ message: "Booking removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting booking", error: error.message });
  }
});

/* GET ALL BOOKINGS */
router.get("/", async (req, res) => {
  try {
    // Fetch all bookings and populate the customer, host, and listing details
    const bookings = await Booking.find()
      .populate("customerId", "username") // Populate customerId with username
      .populate("hostId", "username") // Populate hostId with username
      .populate("listingId", "title") // Populate listingId with title
      .exec();

    res.status(200).json(bookings);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to fetch bookings!", error: err.message });
  }
});

/* UPDATE BOOKING STATUS */
router.patch("/:bookingId/status", async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status field is required" });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: "Failed to update booking status", error: error.message });
  }
});

router.patch("/:bookingId/update", async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { startDate,endDate} = req.body;
    console.log(req.body)
    if (!startDate  || !endDate) {
      return res.status(400).json({ message: "Status field is required" });
    }
//TODO: fix if not working
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { startDate, endDate},
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: "Failed to update booking status", error: error.message });
  }
});

export default router;

