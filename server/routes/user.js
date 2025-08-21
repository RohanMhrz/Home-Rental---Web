const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const Booking = require("../models/Booking");
const User = require("../models/User");
const Listing = require("../models/Listing");

// Middleware: Admin Token Verification

const verifyAdmin = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No or malformed token provided" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded:: ", decoded);

        const user = await User.findById(decoded.id);
        console.log("user::",user)
        if (!user || user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        req.admin = user;
        next();
    } catch (error) {
        console.error("Auth Error:", error.message);
        res.status(403).json({ message: "Invalid token", error: error.message });
    }
};

/* =============================
   🔹 ADMIN USER MANAGEMENT ROUTES
============================= */

/* GET ALL USERS (Admin only) */
router.get("/all", verifyAdmin, async (req, res) => {
    try {
        // Fetch all users excluding their passwords
        console.log("function called::")
        const users = await User.find().select("-password");
        console.log("users:: ",users)
        res.status(200).json(users);
    } catch (error) {
        console.error("Fetch Users Error:", error.message);
        res.status(500).json({ message: "Failed to fetch users", error: error.message });
    }
});

/* UPDATE USER BY ID (Admin only) */
router.put("/all/:id", verifyAdmin, async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, role } = req.body;

    try {
        // Find the user by ID and update their details
        const user = await User.findByIdAndUpdate(
            id,
            { firstName, lastName, role },
            { new: true, select: "-password" }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Update User Error:", error.message);
        res.status(500).json({ message: "Failed to update user", error: error.message });
    }
});

/* DELETE USER BY ID (Admin only) */
router.delete("/all/:id", verifyAdmin, async (req, res) => {
    const { id } = req.params;

    try {
        // Attempt to delete the user by ID
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Delete User Error:", error.message);
        res.status(500).json({ message: "Failed to delete user", error: error.message });
    }
});

/* =============================
   🔹 USER DASHBOARD ROUTES
============================= */

/* GET TRIP LIST */
router.get("/:userId/trips", async (req, res) => {
    const { userId } = req.params;
    try {
        // Fetch all trips related to the user
        const trips = await Booking.find({ customerId: userId }).populate("customerId hostId listingId");
        res.status(200).json(trips);
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: "Cannot find trips!", error: error.message });
    }
});

/* ADD/REMOVE LISTING FROM WISHLIST */
router.patch("/:userId/:listingId", async (req, res) => {
    const { userId, listingId } = req.params;
    try {
        // Fetch the user and listing
        const user = await User.findById(userId);
        const listing = await Listing.findById(listingId).populate("creator");

        // Check if the listing is already in the wishlist
        const isFavorite = user.wishList.some(item => item._id.toString() === listingId);

        if (isFavorite) {
            // Remove from wishlist if it exists
            user.wishList = user.wishList.filter(item => item._id.toString() !== listingId);
            await user.save();
            res.status(200).json({ message: "Listing removed from wish list", wishList: user.wishList });
        } else {
            // Add to wishlist if it doesn't exist
            user.wishList.push(listing);
            await user.save();
            res.status(200).json({ message: "Listing added to wish list", wishList: user.wishList });
        }
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: error.message });
    }
});

/* GET PROPERTY LIST */
router.get("/:userId/properties", async (req, res) => {
    const { userId } = req.params;
    try {
        // Fetch all properties related to the user
        const properties = await Listing.find({ creator: userId }).populate("creator");
        res.status(200).json(properties);
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: "Cannot find properties!", error: error.message });
    }
});

/* GET RESERVATION LIST */
router.get("/:userId/reservations", async (req, res) => {
    const { userId } = req.params;
    try {
        // Fetch all reservations related to the user
        const reservations = await Booking.find({ hostId: userId }).populate("customerId hostId listingId");
        res.status(200).json(reservations);
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: "Cannot find reservations!", error: error.message });
    }
});

module.exports = router;
